import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from '@angular/core/src/render3/instructions';
import { MyTeamsActionComponent } from '../my-teams-action/my-teams-action.component';

@Component({
  selector: 'app-list-of-teams',
  templateUrl: './list-of-teams.component.html',
  styleUrls: ['./list-of-teams.component.css']
})
export class ListOfTeamsComponent implements OnInit {
  teams = new MatTableDataSource<any>([]);

  displayedColumns : String[] = ["SrNo","teamName","teamDescription","positionName","action"]

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
    let councellorId = 0;
    const userId = localStorage.getItem('userId');
    if (userId) {
      councellorId = +userId;
    } else {
      console.warn('User ID not found in localStorage');
      this.isLoading = false;
      this.toastr.error("Error Fetching Teams");
      return; // Exit if userId is not found
    }
    this.http.get<any[]>("http://localhost:8080/api/councellorteam/getallcouncellorteams/"+councellorId)
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

  openDialog(element: any): void {
    this.dialog.open(MyTeamsActionComponent, {
      width: '400px',
      data:element
    });
  }
}
