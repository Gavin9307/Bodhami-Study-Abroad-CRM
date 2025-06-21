import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { CommonHelper } from 'src/app/services/commonHelper';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  get emailError() {
    return this.loginForm.controls.email.hasError('required') ? 'Field is Required' :
      this.loginForm.controls.email.hasError('pattern') ? 'Email is incorrect' : '';
  }

  get passwordError() {
    return this.loginForm.controls.password.hasError('required') ? 'Field is Required' :
      this.loginForm.controls.password.hasError('minlength') ? 'Min length 6' :
      this.loginForm.controls.password.hasError('maxlength') ? 'Max length 15' : '';
  }

  loginform() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; 
  
      this.apiService.councellorLoginAuthentication(email, password).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status === 'INACTIVE') {
            this.toastr.error('Your Account has been blocked! Please Contact Admin', 'Error');
            return; 
          }
          localStorage.setItem('userId', data.id);
          localStorage.setItem('userRole', window.btoa(data.role));
          this.toastr.success('Login successful!', 'Success'); // ✅ Show success message
          this.router.navigate(['/home']);
        },
        (err) => {
          if (err.status === 401) {
            this.toastr.error('Invalid email or password!', 'Login Failed'); // ❌ Unauthorized (401)
          } else if (err.status === 500) {
            this.toastr.error('An unexpected error occurred. Please try again later.', 'Error'); // ❌ Server error (500)
          } else {
            this.toastr.error('Something went wrong. Please try again.', 'Error'); // ❌ Other errors
          }
        }
      );
    }
  }

  openSignupPopup(): void {
    this.dialog.open(SignupPopupComponent, {
      width: '400px'
    });
  }
}
