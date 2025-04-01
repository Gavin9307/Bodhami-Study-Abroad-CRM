import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-action',
  templateUrl: './application-action.component.html',
  styleUrls: ['./application-action.component.css']
})
export class ApplicationActionComponent implements OnInit {
constructor(private router: Router,public dialogRef: MatDialogRef<ApplicationActionComponent>) {}

    updateStatusAppication(): void {
    console.log('Button 1 clicked');
    this.router.navigate(['']); 
    this.dialogRef.close();
  }

  onButton2Click(): void {
    console.log('Button 2 clicked');
    // Add any action for Button 2
    this.router.navigate(['/application-management/view-application']);
    this.dialogRef.close(); // Close the dialog after the action
  }

  ngOnInit() {
  }
}
