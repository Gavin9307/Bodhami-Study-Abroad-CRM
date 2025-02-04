import { Component } from '@angular/core';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent {
  // Available countries and universities
  countries: string[] = ['India', 'USA', 'UK', 'Canada', 'Germany'];
  universities: string[] = ['IIT Bombay', 'IIT Delhi', 'MIT', 'Harvard', 'Stanford'];

  // Student model to store form data
  student = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    selectedCountries: [] as string[], // Stores selected countries
    selectedUniversities: [] as string[], // Stores selected universities
    course: ''
  };
}
