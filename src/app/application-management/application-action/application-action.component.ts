import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-action',
  templateUrl: './application-action.component.html',
  styleUrls: ['./application-action.component.css']
})
export class ApplicationActionComponent implements OnInit {
  constructor(private router: Router,public dialogRef: MatDialogRef<ApplicationActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  viewApplication(): void {
    console.log('Button 1 clicked');
    this.router.navigate(['/application-management/application-view/'+this.data.appId]); 
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
