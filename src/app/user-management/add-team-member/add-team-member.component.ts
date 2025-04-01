import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TeamActionComponent } from '../team-action/team-action.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from '@angular/core/src/render3/instructions';
import { ActivatedRoute } from '@angular/router';
import { AddTeamMemberActionComponent } from '../add-team-member-action/add-team-member-action.component';
@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent implements OnInit {

  teams = new MatTableDataSource<any>([]);
  selectedCouncellor = 0;
  selectedPosition = 0;
  councellorList : any[];
  positionList : any[];
  displayedColumns : String[] = ["SrNo","councellorName","position","action"]

  isLoading:Boolean = false; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,private toastr : ToastrService,private dialog:MatDialog,private route: ActivatedRoute) {}
  ngOnInit() {
    this.getAllTeamCouncellors();
    this.getCouncellorDropDown();
    this.getPositionDropDown();
  }

  ngAfterViewInit() {
    this.teams.paginator = this.paginator;
  }

  getAllTeamCouncellors(){
    this.isLoading = true;
    const teamId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/teamcouncellor/getallteamcouncellors/"+teamId)
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;
        });
        this.teams.data = response;
        this.isLoading = false;
      },
      (error)=>{
        // console.log("Error Fetching Teams. Reason : " + error.message);
        this.isLoading = false;
        this.toastr.error("Error Fetching Team Councellors");
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
    const dialogRef: MatDialogRef<AddTeamMemberActionComponent> = this.dialog.open(AddTeamMemberActionComponent, {
      width: '400px',
      data: element
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTeamCouncellors();
    });
  }

  getCouncellorDropDown(){
    this.isLoading = true;
    const teamId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/teamcouncellor/getaddteamcouncellordropdown/"+teamId)
    .subscribe(
      (response)=>{
        this.councellorList = response;
        this.isLoading = false;
      },
      (error)=>{
        // console.log("Error Fetching Teams. Reason : " + error.message);
        this.isLoading = false;
        this.toastr.error("Error Fetching Team Councellor Dropdown");
      }
    )
  }

  getPositionDropDown(){
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/team/getallteamcouncellorposition")
    .subscribe(
      (response)=>{
        this.positionList = response;
        this.selectedPosition = response[0]["positionId"];
        this.isLoading = false;
      },
      (error)=>{
        // console.log("Error Fetching Teams. Reason : " + error.message);
        this.isLoading = false;
        this.toastr.error("Error Fetching Team Position Dropdown");
      }
    )
  }

  addCouncellor(){
    this.isLoading = true;
    const teamId : String = this.route.snapshot.paramMap.get('id');
    this.http.post<any[]>("http://localhost:8080/api/teamcouncellor/add",{
        councellorId:this.selectedCouncellor,
        teamId:teamId,
        positionId:this.selectedPosition,
        isDeleted:false
    })
    .subscribe(
      (response)=>{
        this.isLoading = false;
        this.getAllTeamCouncellors();
        this.getCouncellorDropDown();
        this.getPositionDropDown();
        this.toastr.success("Councellor added to Team");
      },
      (error)=>{
        // console.log("Error Fetching Teams. Reason : " + error.message);
        this.isLoading = false;
        this.toastr.error("Error Adding Councellors to Team");
      }
    )
  }
}
