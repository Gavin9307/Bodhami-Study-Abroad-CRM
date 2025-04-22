import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-university-action',
  templateUrl: './university-action.component.html',
  styleUrls: ['./university-action.component.css']
})
export class UniversityActionComponent implements OnInit {
 constructor(private router: Router, public dialogRef: MatDialogRef<UniversityActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
  }

  onChecklistButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/university-setup/university-checklist-setup/'+this.data.universityId]);
    this.dialogRef.close();
  }

  onEditButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/university-setup/edit-university/'+this.data.universityId]);
    this.dialogRef.close(); 
  }

  onDeleteButtonClick(): void {
    console.log('Button 3 clicked');
    this.dialogRef.close(); 
  }
}
