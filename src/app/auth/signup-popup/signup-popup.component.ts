import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.css']
})
export class SignupPopupComponent implements OnInit {
  signupForm: FormGroup;
  countries: any[] = []; // Array to hold country data
  private apiEndpoint = 'http://localhost:8080/user'; // Replace with your API endpoint
  private countriesApiEndpoint = 'http://localhost:8080/api/countries'; // Endpoint for countries

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<SignupPopupComponent>
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      country: ['', Validators.required], // Ensure this maps to countryId
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.http.get<any[]>(this.countriesApiEndpoint)
      .pipe(
        catchError(error => {
          console.error('Error fetching countries:', error);
          this.toastr.error('Unable to load countries. Please try again later.');
          return of([]);
        })
      )
      .subscribe(response => {
        this.countries = response; 
      });
  }

  createAccount(): void {
    if (this.signupForm.invalid) {
      this.toastr.error('Please fill out all required fields correctly.');
      return;
    }

    const signupData = {
      ...this.signupForm.value,
      countryId: this.signupForm.value.country 
    };

    this.http.post(this.apiEndpoint, signupData)
      .pipe(
        catchError(error => {
          console.error('Signup error:', error);
          this.toastr.error('We have encountered an issue while processing your request. Kindly try again later.');
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          const userId = response['userId']
          this.toastr.success('Sign up successful!');
          this.router.navigate(['/welcome'],{queryParams: {userId}}).then(() => {
            if (this.dialogRef) {
              this.dialogRef.close();
            }
          });
        } else {
          this.toastr.error('We have encountered an issue while processing your request. Kindly try again later.');
        }
      });
  }
}
