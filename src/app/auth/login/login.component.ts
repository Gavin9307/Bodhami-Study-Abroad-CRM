import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { CommonHelper } from 'src/app/services/commonHelper';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    emails: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    passwords: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(6)]),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private commonHelper: CommonHelper,
    private dialog: MatDialog  // Inject MatDialog
  ) { }

  ngOnInit() {
  }

  emails() {
    return this.loginForm.controls.emails.hasError('required') ? ' Field is Required' :
      this.loginForm.controls.emails.hasError('pattern') ? 'Email is incorrect' :
        '';
  }

  passwords() {
    return this.loginForm.controls.passwords.hasError('required') ? ' Field is Required' :
      this.loginForm.controls.passwords.hasError('minlength') ? 'Min length 6' :
        this.loginForm.controls.passwords.hasError('maxlength') ? 'Max length 15' :
          '';
  }

  loginform(emails: string, password: string) {
    if (this.loginForm.valid) {
      this.apiService.customerloginauthentication(emails, password).subscribe((data: any) => {
        localStorage.setItem('userToken', window.btoa(data.userId));
        localStorage.setItem('userRoles', window.btoa(data.userRoleGroup));
        this.router.navigate(['/common/dashboard']);
      }, err => {
        this.commonHelper.handleError(err);
      });
    }
  }

  openSignupPopup(): void {
    this.dialog.open(SignupPopupComponent, {
      width: '400px'
    });
  }
}
