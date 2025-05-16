import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-country-university-checklist-action',
  templateUrl: './application-country-university-checklist-action.component.html',
  styleUrls: ['./application-country-university-checklist-action.component.css']
})
export class ApplicationCountryUniversityChecklistActionComponent implements OnInit {
  constructor(private router: Router,public dialogRef: MatDialogRef<ApplicationCountryUniversityChecklistActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  removeChecklist(): void {
    this.router.navigate(['/application-management/country', this.data.countryId, 'checklist-list', this.data.appId]); 
    this.dialogRef.close();
  }

  viewDocuments(): void {
    this.router.navigate(['/application-management/country', this.data.countryId,'university',this.data.universityId,'checklist',this.data.checklistId,'universityChecklist',this.data.appUniversityChecklistMappingId, 'document-list', this.data.appId]);
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
