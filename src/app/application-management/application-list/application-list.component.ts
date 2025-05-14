import { Component,ViewChild, OnInit,AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationActionComponent } from '../application-action/application-action.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

    applications = new MatTableDataSource<any>([]);
    originalDataSource: any[] = [];

    statusOptions: string[] = ['in-progress', 'submitted', 'approved', 'rejected'];
  
    displayedColumns : String[] = ["SrNo","applicationId","applicationFirstName","applicationLastName","applicationEmail","applicationTeamName","applicationStatus","isDeleted","action"]
    
    isLoading:Boolean = false; 
    searchForm : FormGroup;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private http: HttpClient,private toastr : ToastrService,private dialog:MatDialog) {}
  
    openDialog(element : any): void {
      this.dialog.open(ApplicationActionComponent, {
        width: '400px',
        data: element 
      });
    }
  
    ngOnInit() {
      this.getAllApplications();
      this.searchForm = new FormGroup({
        appId: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        userEmail: new FormControl(''),
        status: new FormControl(''),
        taggedToTeam: new FormControl('')
      });
    }

    onSearch(): void {
      const formValue = this.searchForm.value;
    
      this.applications.data = this.originalDataSource.filter(item =>
        (item.applicationId && formValue.appId ? item.applicationId.toLowerCase().includes(formValue.appId.toLowerCase()) : true) &&
        (item.applicationFirstName && formValue.firstName ? item.applicationFirstName.toLowerCase().includes(formValue.firstName.toLowerCase()) : true) &&
        (item.applicationLastName && formValue.lastName ? item.applicationLastName.toLowerCase().includes(formValue.lastName.toLowerCase()) : true) &&
        (item.applicationEmail && formValue.userEmail ? item.applicationEmail.toLowerCase().includes(formValue.userEmail.toLowerCase()) : true) &&
        (item.applicationStatus && formValue.status ? item.applicationStatus.toLowerCase().includes(formValue.status.toLowerCase()) : true) &&
        (item.applicationTeamName && formValue.taggedToTeam ? item.applicationTeamName.toLowerCase().includes(formValue.taggedToTeam.toLowerCase()) : true)
      );

      console.log(this.applications.data);
    }
    
    
    
    
  
    onClear(): void {
      this.searchForm.reset();
      this.applications.data = this.originalDataSource;
    }
  
    ngAfterViewInit() {
      this.applications.paginator = this.paginator;
    }
  
    getAllApplications(){
      this.isLoading = true;
      this.http.get<any[]>("http://localhost:8080/api/application/getallapplications")
      .subscribe(
        (response)=>{
          response.forEach((element,index) => {
            element["SrNo"] = index+1;
          });
          this.originalDataSource = response;
          this.applications.data = response;
          this.isLoading = false;
        },
        (error)=>{
          this.isLoading = false;
          this.toastr.error("Error Fetching Applications");
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

    getStatusClass(status: string): string {
      switch (status.toLowerCase()) {
        case 'in-progress':
          return 'status-in-progress';
        case 'submitted':
          return 'status-submitted';
        case 'approved':
          return 'status-approved';
        case 'rejected':
          return 'status-rejected';
        default:
          return '';
      }
    }
    
  
}
