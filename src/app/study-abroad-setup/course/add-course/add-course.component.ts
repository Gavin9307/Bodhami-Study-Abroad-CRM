import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) { }
  ngOnInit() {
    this.fetchUniversities();
  }
  universities: any[] = [];
  isLoading: boolean = false;

  courseName: string = '';
  courseDescription: string = '';
  coursePrice: number | null = null;
  courseDuration: number | null = null;
  courseLevel: string = '';
  universityId: number | null = null;
  courseAreaOfStudy: string = '';

  addCourse() {
    this.isLoading = true;

    const payload = {
      courseName: this.courseName,
      courseDescription: this.courseDescription,
      coursePrice: this.coursePrice,
      courseDuration: this.courseDuration,
      courseLevel: this.courseLevel,
      universityId: this.universityId,
      courseAreaOfStudy: this.courseAreaOfStudy,
      councellorId: 1
    };

    this.http.post("http://localhost:8080/api/course/addcourse", payload)
      .subscribe(
        (response) => {
          this.toastr.success("Course Created successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Course Already Exists");
          this.isLoading = false;
        }
      );
  }

  fetchUniversities() {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:8080/api/university/getalluniversities')
      .subscribe(
        (data) => {
          this.universities = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching Universities:', error);
          this.isLoading = false;
        }
      );
  }
}
