import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

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

  ngOnInit() {
  }

}
