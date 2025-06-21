import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileActionComponent } from '../Profile-action/profile-action/profile-action.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService, private route: ActivatedRoute, private dialog: MatDialog,private router: Router) { }

  ngOnInit() {
    this.getCouncellor();
  }

  openProfileMenu(event: MouseEvent): void {
    this.dialog.open(ProfileActionComponent, {
      position: {
        top: `${event.clientY + 40}px`,
        left: `${event.clientX - 300}px`
      },
      width: '568px',
      height: '600px',
      panelClass: 'custom-dialog'
    });
  }

   councellor: Object = {}

   getCouncellor() {
    let councellorId = 0;
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      councellorId = +userId;
    } else {
      console.warn('User ID not found in localStorage');
    }
    this.http.get("http://localhost:8080/api/councellor/getsinglecouncellor/" + councellorId)
      .subscribe(
        (response) => {
          this.councellor = response;
        },
        (error) => {
          this.toastr.error("Error fetching details of councellor");
        }
      )
    }

    navigateToHome() {
      this.router.navigate(['/home']);
    }


}
