import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeamActionComponent } from 'src/app/user-management/team-action/team-action.component';

@Component({
  selector: 'app-student-action',
  templateUrl: './student-action.component.html',
  styleUrls: ['./student-action.component.css']
})
export class StudentActionComponent implements OnInit {

  constructor(private router: Router,public dialogRef: MatDialogRef<TeamActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}
  
    ngOnInit() {
      console.log(this.data);
    }
    onEditButtonClick(): void {
      this.router.navigate(['/student-management/student-edit/'+this.data.userId]); 
      this.dialogRef.close(); 
    }

    onSendEmailClick(): void {
      window.location.href = `mailto:${this.data.userEmail}`;
      this.dialogRef.close();
    }

    onViewApplicationClick(): void {
      // this.router.navigate(['/user-management/team-list/edit-team/'+this.data.teamId]);
      // this.dialogRef.close();
    }

}
