import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  course: Object = {};

  isLoading: boolean = false;

  universities: any[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCourse();
    this.fetchUniversities();
  }

  getCourse() {
    this.isLoading = true;
    const courseId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`http://localhost:8080/api/course/getsinglecourse/${courseId}`)
      .subscribe(
        (response) => {
          this.course = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching Course");
          this.isLoading = false;
        }
      );
  }

  editCourse() {
    this.isLoading = true;
    const courseId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.put(`http://localhost:8080/api/course/editcourse/${courseId}`,this.course)
      .subscribe(
        (response) => {
          this.toastr.success("Course Edited Successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Failed to Edit Course");
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
