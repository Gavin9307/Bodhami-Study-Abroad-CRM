import { Component,ViewChild, OnInit,AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentActionComponent } from '../student-action/student-action.component';
import { element } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students = new MatTableDataSource<any>([]);

  displayedColumns : String[] = ["SrNo","userFirstName","userLastName","userEmail","userUsername","userPhoneNumber","isDeleted","action"]
  
  isLoading:Boolean = false; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,private toastr : ToastrService,private dialog:MatDialog) {}

  openDialog(element : any): void {
    this.dialog.open(StudentActionComponent, {
      width: '400px',
      data: element // You can adjust the dialog width as needed
    });
  }

  ngOnInit() {
    this.getAllStudents();
  }

  ngAfterViewInit() {
    this.students.paginator = this.paginator;
  }

  getAllStudents(){
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/user/getalluserlist")
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;
        });
        this.students.data = response;
        this.isLoading = false;
      },
      (error)=>{
        // console.log("Error Fetching Councellors. Reason : " + error.message);
        this.isLoading = false;
        this.toastr.error("Error Fetching Students");
      }
    )
  }

  onIsDeletedChange(element : any[]){
    
    const isDeleted:Boolean = element["isDeleted"];
    const userId:Number = element["userId"];

    if(isDeleted == true){
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/user/delete/"+userId,{})
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success("Student Deleted Successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Student Cannot be Deleted");
          this.isLoading = false;
        }
      );
    }
    else{
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/user/recover/"+userId,{})
      .subscribe(
        response => {
          this.toastr.success("Student Recovered Successfully");
          this.isLoading = false;
        },
        error => {
          this.toastr.error("Student Cannot be Recovered");
          this.isLoading = false;
        }
      );
    }
  }

}

