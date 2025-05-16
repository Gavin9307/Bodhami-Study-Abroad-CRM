import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checklist-action',
  templateUrl: './checklist-action.component.html',
  styleUrls: ['./checklist-action.component.css']
})
export class ChecklistActionComponent implements OnInit {
  constructor(private toastr : ToastrService,private http: HttpClient,private router: Router, public dialogRef: MatDialogRef<ChecklistActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
  }

  isLoading : Boolean = false;

  onEditButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/checklist-setup/edit-checklist/'+this.data.checklistID]);
    this.dialogRef.close(); 
  }

  onDeleteButtonClick(): void {
    this.isLoading = true;
    this.http.delete('http://localhost:8080/api/checklist/delete/'+this.data.checklistID).subscribe(
      (response) => {
        this.toastr.success('Checklist deleted successfully');
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Error deleting checklist');
        this.isLoading = false;
      }
    );
    this.dialogRef.close(); 
  }

}
