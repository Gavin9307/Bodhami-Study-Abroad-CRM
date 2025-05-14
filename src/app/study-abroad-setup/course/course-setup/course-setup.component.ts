import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CourseActionComponent } from '../course-action/course-action.component';

@Component({
  selector: 'app-course-setup',
  templateUrl: './course-setup.component.html',
  styleUrls: ['./course-setup.component.css']
})
export class CourseSetupComponent implements OnInit {
  displayedColumns: string[] = [
        'SrNo',
        'courseName',
        'courseLevel',
        'universityName',
        'countryName',
        'isDeleted',
        'action'
      ];
    
      dataSource = new MatTableDataSource<any>([]);
      isLoading: boolean = false;
    
      @ViewChild(MatPaginator) paginator!: MatPaginator;
    
      constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService) { }
    
      ngOnInit() {
        this.fetchCourses();
      }
    
      fetchCourses() {
        this.isLoading = true;
        this.http.get<any[]>('http://localhost:8080/api/course/getallcourses')
          .subscribe(
            (data) => {
              data.forEach((element, index) => {
                element["SrNo"] = index + 1;
              });
              console.log(data)
              this.dataSource.data = data;
              this.dataSource.paginator = this.paginator;
              this.isLoading = false;
            },
            (error) => {
              console.error('Error fetching Courses:', error);
              this.isLoading = false;
            }
          );
      }
    
      toggleDeleteStatus(element: any[]) {
    
        const isDeleted: Boolean = element["isDeleted"];
        const courseId: Number = element["courseId"];
    
        if (isDeleted == true) {
          this.isLoading = true;
          this.http.put("http://localhost:8080/api/course/softdelete/" + courseId, {})
            .subscribe(
              (response) => {
                console.log(response);
                this.toastr.success("Course Status Set to Inactive");
                this.isLoading = false;
              },
              (error) => {
                this.toastr.error("Failed to Set Course Status to Inactive");
                this.isLoading = false;
              }
            );
        }
        else {
          this.isLoading = true;
          this.http.put("http://localhost:8080/api/course/softrecover/" + courseId, {})
            .subscribe(
              response => {
                this.toastr.success("Course Status Set to Active");
                this.isLoading = false;
              },
              error => {
                this.toastr.error("Failed to Set Course Status to Active");
                this.isLoading = false;
              }
            );
        }
      }
    
      openDialog(element: any): void {
        this.dialog.open(CourseActionComponent, {
          width: '400px',
          data: element
        });
      }
}
