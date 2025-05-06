import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-country-university-action',
  templateUrl: './application-country-university-action.component.html',
  styleUrls: ['./application-country-university-action.component.css']
})
export class ApplicationCountryUniversityActionComponent implements OnInit {
  constructor(private router: Router,public dialogRef: MatDialogRef<ApplicationCountryUniversityActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  viewApplicationUniversityChecklist(): void {
    this.router.navigate(['application-management/country', this.data.countryId,'university',this.data.universityId, 'checklist-list', this.data.appId]); 
    this.dialogRef.close();
  }

  viewApplicationUniversityCourses(): void {
    this.router.navigate(['/application-management/country', this.data.countryId, 'university',this.data.universityId ,'course-list',this.data.appId]);
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
