import { Component,ViewChild, OnInit,AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamActionComponent } from '../team-action/team-action.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit,AfterViewInit  {
  councellors = new MatTableDataSource<any>([]);

  displayedColumns : String[] = ["SrNo","councellorName","councellorPhno","councellorEmail","councellorRole","isDeleted","editCouncellor"]
  
  isLoading:Boolean = false; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,private toastr : ToastrService) {}

  ngOnInit() {
    this.getAllCouncellors();
  }

  ngAfterViewInit() {
    this.councellors.paginator = this.paginator;
  }

  getAllCouncellors(){
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/councellor/getallcouncellors")
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;
        });
        this.councellors.data = response;
        this.isLoading = false;
      },
      (error)=>{
        // console.log("Error Fetching Councellors. Reason : " + error.message);
        this.isLoading = false;
        this.toastr.error("Error Fetching Councellors");
      }
    )
  }

  onIsDeletedChange(element : any[]){
    
    const isDeleted:Boolean = element["isDeleted"];
    const councellorId:Number = element["councellorId"];

    if(isDeleted == true){
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/councellor/softdeletecouncellor/"+councellorId,{})
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success("Counsellor Status Set To Inactive");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Failed to Set Counsellor Status To Inactive");
          this.isLoading = false;
        }
      );
    }
    else{
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/councellor/softrecovercouncellor/"+councellorId,{})
      .subscribe(
        response => {
          this.toastr.success("Counsellor Status Set To Active");
          this.isLoading = false;
        },
        error => {
          this.toastr.error("Failed to Set Counsellor Status To Active");
          this.isLoading = false;
        }
      );
    }
  }

}
