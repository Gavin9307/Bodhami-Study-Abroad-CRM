import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-action',
  templateUrl: './profile-action.component.html',
  styleUrls: ['./profile-action.component.css']
})
export class ProfileActionComponent implements OnInit {
constructor(private router: Router,public dialogRef: MatDialogRef<ProfileActionComponent>) {}
  
  ngOnInit() {
  }

}

