import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-action',
  templateUrl: './team-action.component.html',
  styleUrls: ['./team-action.component.css']
})
export class TeamActionComponent implements OnInit {

  constructor(private router: Router,public dialogRef: MatDialogRef<TeamActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}
  
    ngOnInit() {
      console.log(this.data);
    }
    onButton1Click(): void {
      console.log('Button 1 clicked');
      this.router.navigate(['/user-management/team-list/add-member/'+this.data.teamId]); 
      this.dialogRef.close(); 
    }

    onButton3Click(): void {
      console.log('Button 3 clicked');
      this.router.navigate(['/user-management/team-list/edit-team/'+this.data.teamId]);
      this.dialogRef.close();
    }
}
