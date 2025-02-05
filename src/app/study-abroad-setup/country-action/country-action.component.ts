import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-action',
  templateUrl: './country-action.component.html',
  styleUrls: ['./country-action.component.css']
})
export class CountryActionComponent implements OnInit {
constructor(private router: Router,public dialogRef: MatDialogRef<CountryActionComponent>) {}

  onButton1Click(): void {
    console.log('Button 1 clicked');
    this.router.navigate(['/study-abroad-setup/country-setup/checklist-setup']); // Navigate to the route
    this.dialogRef.close(); // Close the dialog after navigation
  }

  onButton2Click(): void {
    console.log('Button 2 clicked');
    // Add any action for Button 2
    this.router.navigate(['/study-abroad-setup/country-setup/checklist-setup']);
    this.dialogRef.close(); // Close the dialog after the action
  }
  
  ngOnInit() {
  }

}
