import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-view-country-action',
  templateUrl: './application-view-country-action.component.html',
  styleUrls: ['./application-view-country-action.component.css']
})
export class ApplicationViewCountryActionComponent implements OnInit {
  constructor(private router: Router,public dialogRef: MatDialogRef<ApplicationViewCountryActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  viewApplicationCountryChecklist(): void {
    this.router.navigate(['/application-management/country', this.data.countryId, 'checklist-list', this.data.appId]); 
    this.dialogRef.close();
  }

  viewApplicationCountryUniversities(): void {
    this.router.navigate(['/application-management/country', this.data.countryId, 'university-list', this.data.appId]);
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
