import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-action',
  templateUrl: './course-action.component.html',
  styleUrls: ['./course-action.component.css']
})
export class CourseActionComponent implements OnInit {
  constructor(private router: Router, public dialogRef: MatDialogRef<CourseActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
  }

  onChecklistButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/course-setup/course-checklist-setup/'+this.data.courseId]);
    this.dialogRef.close();
  }

  onEditButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/course-setup/edit-course/'+this.data.courseId]);
    this.dialogRef.close(); 
  }

  onDeleteButtonClick(): void {
    console.log('Button 3 clicked');
    this.dialogRef.close(); 
  }
}
