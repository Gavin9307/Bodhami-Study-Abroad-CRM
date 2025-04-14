import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() { }

  isLoading: Boolean = false;

  firstName: String = "";
  lastName: String = "";
  middleName: String = "";
  dateOfBirth: String = "";
  email: String = "";
  username: String = "";
  password: String = "";
  phoneNo: String = "";
  pic: String = "";
  isDeleted: Boolean = false;


  addStudent() {
    const formattedDOB = this.dateOfBirth instanceof Date
      ? this.dateOfBirth.toISOString().split('T')[0]
      : this.dateOfBirth; // assumes string is already formatted
  
    this.isLoading = true;
  
    this.http.post("http://localhost:8080/api/user/add", {
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      dateOfBirth: formattedDOB,
      email: this.email,
      username: this.username,
      password: this.password,
      phoneNo: this.phoneNo,
      pic: this.pic,
      isDeleted: this.isDeleted
    })
    .subscribe(
      (response) => {
        this.toastr.success("Student added successfully");
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error("Student cannot be added");
        this.isLoading = false;
      }
    );
  }
  

}
