import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  constructor(private http: HttpClient,private toastr : ToastrService) { }

  ngOnInit() {}

  teamName : String = "";
  teamDescription : String = "";

  isLoading : Boolean = false;

  addTeam(){
    this.isLoading = true;
    this.http.post("http://localhost:8080/api/team/add",{
      teamName: this.teamName,
      teamDescription: this.teamDescription,
    })
    .subscribe(
      (response)=>{
        this.toastr.success("Team added successfully");
        this.isLoading = false;
      },
      (error)=>{
        this.toastr.error("Team cannot be added");
        this.isLoading = false;
      }
    )
  }

}
