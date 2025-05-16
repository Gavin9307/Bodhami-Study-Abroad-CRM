import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-country-checklist-action',
  templateUrl: './application-country-checklist-action.component.html',
  styleUrls: ['./application-country-checklist-action.component.css']
})
export class ApplicationCountryChecklistActionComponent implements OnInit {
constructor(private router: Router,public dialogRef: MatDialogRef<ApplicationCountryChecklistActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  removeChecklist(): void {
    this.router.navigate(['/application-management/country', this.data.countryId, 'checklist-list', this.data.appId]); 
    this.dialogRef.close();
  }

  viewDocuments(): void {
    this.router.navigate(['/application-management/country', this.data.countryId,'checklist',this.data.checklistId,'countrychecklist',this.data.appCountryChecklistMappingId, 'document-list', this.data.appId]);
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
