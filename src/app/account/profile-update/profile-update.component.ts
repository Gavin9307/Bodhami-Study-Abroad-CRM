import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  profileForm: FormGroup;
  states = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh'];
  
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['Counselor', Validators.required],
      lastName: ['Whitelabel', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: [''],
      country: ['India'],
      phone: ['9738416689'],
      email: ['careerfest.goancarl@gmail.com', [Validators.required, Validators.email]],
      experienceYears: ['0'],
      state: ['Tamil Nadu'],
      city: ['Chennai'],
      pincode: ['600001'],
      institutionName: [''],
      profileDescription: [''],
      designation: [''],
      profileHeadline: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    // Handle file upload logic here
  }

}
