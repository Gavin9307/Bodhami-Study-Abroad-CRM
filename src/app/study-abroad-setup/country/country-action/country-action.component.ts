import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-action',
  templateUrl: './country-action.component.html',
  styleUrls: ['./country-action.component.css']
})
export class CountryActionComponent implements OnInit {
  constructor(private router: Router, public dialogRef: MatDialogRef<CountryActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
  }

  onChecklistButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/country-setup/country-checklist-setup/'+this.data.countryId]);
    this.dialogRef.close();
  }

  onEditButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/country-setup/edit-country/'+this.data.countryId]);
    this.dialogRef.close(); 
  }

  onDeleteButtonClick(): void {
    console.log('Button 3 clicked');
    this.dialogRef.close(); 
  }

}
