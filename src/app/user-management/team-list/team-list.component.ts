import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamActionComponent } from '../team-action/team-action.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teams = new MatTableDataSource<any>([]);

  displayedColumns : String[] = ["SrNo","teamName","teamDescription","teamSize","createdAt","isDeleted","action"]

  isLoading:Boolean = false; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,private toastr : ToastrService,private dialog:MatDialog) {}

  ngOnInit() {
    this.getAllTeams();
  }

  ngAfterViewInit() {
    this.teams.paginator = this.paginator;
  }

  getAllTeams(){
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/team/getallteams")
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;
          element["createdAt"] = new Date(element["createdAt"]).toLocaleDateString('en-IN');
        });
        this.teams.data = response;
        this.isLoading = false;
      },
      (error)=>{
        // console.log("Error Fetching Teams. Reason : " + error.message);
        this.isLoading = false;
        this.toastr.error("Error Fetching Teams");
      }
    )
  }

  onIsDeletedChange(element : any[]){
    
    const isDeleted:Boolean = element["isDeleted"];
    const teamId:Number = element["teamId"];

    if(isDeleted == true){
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/team/delete/"+teamId,{})
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success("Team Deleted Successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Team Cannot be Deleted");
          this.isLoading = false;
        }
      );
    }
    else{
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/team/recover/"+teamId,{})
      .subscribe(
        response => {
          this.toastr.success("Team Recovered Successfully");
          this.isLoading = false;
        },
        error => {
          this.toastr.error("Team Cannot be Recovered");
          this.isLoading = false;
        }
      );
    }
  }

  openDialog(element: any): void {
    this.dialog.open(TeamActionComponent, {
      width: '400px',
      data:element
    });
  }
}
