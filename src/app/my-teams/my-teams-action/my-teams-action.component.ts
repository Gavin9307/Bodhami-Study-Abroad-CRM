import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-teams-action',
  templateUrl: './my-teams-action.component.html',
  styleUrls: ['./my-teams-action.component.css']
})
export class MyTeamsActionComponent implements OnInit {

constructor(private router: Router,public dialogRef: MatDialogRef<MyTeamsActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}
  
    ngOnInit() {
    }
    onButton1Click(): void {
      console.log('Button 1 clicked');
      this.router.navigate(['/my-teams/team-member-list/'+this.data.teamId]); 
      this.dialogRef.close(); 
    }

    onButton3Click(): void {
      console.log('Button 3 clicked');
      this.router.navigate(['/application-management/application-list/'+this.data.teamId]);
      this.dialogRef.close();
    }
}
