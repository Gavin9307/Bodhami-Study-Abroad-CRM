import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-action-dialog',
  templateUrl: './student-action-dialog.component.html',
  styleUrls: ['./student-action-dialog.component.css']
})
export class StudentActionDialogComponent {  
  constructor(public dialogRef: MatDialogRef<StudentActionDialogComponent>) {}

  onButton1Click(): void {
    console.log('Button 1 clicked');
    // Add any action for Button 1
    this.dialogRef.close(); // Close the dialog after the action
  }

  onButton2Click(): void {
    console.log('Button 2 clicked');
    // Add any action for Button 2
    this.dialogRef.close(); // Close the dialog after the action
  }
}
