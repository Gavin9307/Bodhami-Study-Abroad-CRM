import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-action',
  templateUrl: './profile-action.component.html',
  styleUrls: ['./profile-action.component.css']
})
export class ProfileActionComponent implements OnInit {
constructor(private http:HttpClient,private toastr:ToastrService,private router: Router,public dialogRef: MatDialogRef<ProfileActionComponent>) {}
  
  ngOnInit() {
    this.fetchCouncellor();
  }

  isLoading : Boolean = false;
  councellor : Object = {};

  fetchCouncellor(){
    this.isLoading = true;
    let councellorId = 0;
    const userId = localStorage.getItem('userId'); // returns a string or null
    if (userId) {
      councellorId = +userId; // converts to number if needed
    } else {
      console.warn('User ID not found in localStorage');
    }
    this.http.get<any>("http://localhost:8080/api/councellor/getsinglecouncellor/"+councellorId)
      .subscribe(
        (response) => {
          this.councellor = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching Councellor");
          this.isLoading = false;
        }
      );
  }

  navigateToHome() {
  this.dialogRef.close();
  this.router.navigate(['/home']);
}

navigateToProfile(){
  this.dialogRef.close();
  this.router.navigate(['/account/profile-update']);
}

navigateToTeams(){
  this.dialogRef.close();
  this.router.navigate(['/my-teams/team-list']);
}

  signout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.toastr.success("Successfully Signed Out");
    this.dialogRef.close(); // Close the dialog
    this.router.navigate(['/auth/login']); // Adjust path as needed
  }
  
}

