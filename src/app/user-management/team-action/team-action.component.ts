import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-action',
  templateUrl: './team-action.component.html',
  styleUrls: ['./team-action.component.css']
})
export class TeamActionComponent implements OnInit {

  constructor(private router: Router,public dialogRef: MatDialogRef<TeamActionComponent>) {}
  
    onButton1Click(): void {
      console.log('Button 1 clicked');
      this.router.navigate(['/user-management/add-team/add-member']); // Navigate to the route
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
