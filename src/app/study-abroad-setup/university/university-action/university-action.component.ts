import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-university-action',
  templateUrl: './university-action.component.html',
  styleUrls: ['./university-action.component.css']
})
export class UniversityActionComponent implements OnInit {
 constructor(private toastr : ToastrService,private http: HttpClient,private router: Router, public dialogRef: MatDialogRef<UniversityActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
  }
  isLoading : Boolean = false;

  onChecklistButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/university-setup/university-checklist-setup/'+this.data.universityId]);
    this.dialogRef.close();
  }

  onEditButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/university-setup/edit-university/'+this.data.universityId]);
    this.dialogRef.close(); 
  }

  onDeleteButtonClick(): void {
    this.isLoading = true;
    this.http.delete('http://localhost:8080/api/university/delete/'+this.data.universityId).subscribe(
      (response) => {
        this.toastr.success('University deleted successfully');
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Error deleting university');
        this.isLoading = false;
      }
    );
    this.dialogRef.close(); 
  }
}
