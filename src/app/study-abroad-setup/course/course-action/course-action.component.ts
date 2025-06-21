import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-action',
  templateUrl: './course-action.component.html',
  styleUrls: ['./course-action.component.css']
})
export class CourseActionComponent implements OnInit {
  constructor(private toastr : ToastrService,private http: HttpClient,private router: Router, public dialogRef: MatDialogRef<CourseActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
  }

  isLoading : Boolean = false;

  onEditButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/course-setup/edit-course/'+this.data.courseId]);
    this.dialogRef.close(); 
  }

  onDeleteButtonClick(): void {
    this.isLoading = true;
    this.http.delete('http://localhost:8080/api/course/delete/'+this.data.courseId).subscribe(
      (response) => {
        this.toastr.success('Course deleted successfully');
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Error deleting course');
        this.isLoading = false;
      }
    );
    this.dialogRef.close(); 
  }
}
