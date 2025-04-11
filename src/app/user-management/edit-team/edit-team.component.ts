import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  constructor(private http: HttpClient,private toastr : ToastrService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTeam();
  }

  team: Object = {}
  isLoading : Boolean = false;

  getTeam(){
    this.isLoading = true;
    const teamId : String = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:8080/api/team/getsingleteam/"+teamId)
    .subscribe(
      (response)=>{
        this.team = response;
        this.isLoading = false;
      },
      (error)=>{
        this.toastr.error("Error fetching details of team");
        this.isLoading = false;
      }
    )
  }

  onSaveClick(){
    this.isLoading = true;
    const teamId : String = this.route.snapshot.paramMap.get('id');
    this.http.put("http://localhost:8080/api/team/edit/"+teamId,{
      teamName : this.team["teamName"],
      teamDescription : this.team["teamDescription"]
    })
    .subscribe(
      (response)=>{
        this.toastr.success("Team Details Updated Successfully");
        this.isLoading = false;
      },
      (error)=>{
        this.toastr.error("Error Updating Team Details");
        this.isLoading = false;
      }
    )
  }

}
