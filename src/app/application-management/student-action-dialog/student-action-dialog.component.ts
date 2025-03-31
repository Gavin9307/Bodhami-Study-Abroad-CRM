import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-action-dialog',
  templateUrl: './student-action-dialog.component.html',
  styleUrls: ['./student-action-dialog.component.css']
})

export class StudentActionDialogComponent {  
  constructor(private router: Router,public dialogRef: MatDialogRef<StudentActionDialogComponent>) {}

  onButton1Click(): void {
    console.log('Button 1 clicked');
    this.router.navigate(['/application-management/edit-student']); // Navigate to the route
    this.dialogRef.close(); // Close the dialog after navigation
  }

  onButton2Click(): void {
    console.log('Button 2 clicked');
    // Add any action for Button 2
    this.router.navigate(['/application-management/view-application']);
    this.dialogRef.close(); // Close the dialog after the action
  }
}
