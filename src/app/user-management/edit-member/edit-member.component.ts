import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})

export class EditMemberComponent implements OnInit {

  councellor : Object = {};
  isLoading:Boolean = false;
  roles: string[] = ['ADMIN', 'COUNSELLOR'];

  constructor(private http: HttpClient,private toastr : ToastrService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCouncellor();
  }

  getCouncellor(){
    this.isLoading = true;
    const councellorId : String = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:8080/api/councellor/getsinglecouncellor/"+councellorId)
    .subscribe(
      (response)=>{
        //console.log(response);
        this.councellor = response;
        this.isLoading = false;
      },
      (error)=>{
        //console.log(error);
        this.toastr.error("Error Fetching Councellor Details")
        this.isLoading = false;
      }
    )
  }

  editCouncellor(){
    this.isLoading = true;
    const councellorId : String = this.route.snapshot.paramMap.get('id');
    this.http.put("http://localhost:8080/api/councellor/editcouncellor/"+councellorId,
      {
          councellorName: this.councellor["councellorName"],
          councellorEmail: this.councellor["councellorEmail"],
          councellorPhoneNumber: this.councellor["councellorPhoneNumber"],
          councellorDepartment: this.councellor["councellorDepartment"],
          councellorRole: this.councellor["councellorRole"],
          councellorImage: this.councellor["councellorImage"],
          councellorAddress: this.councellor["councellorAddress"],
          councellorStatus: this.councellor["councellorStatus"],
          isDeleted: this.councellor["isDeleted"],
          createdAt: this.councellor["createdAt"],
          updatedAt: this.councellor["updatedAt"],
      }
    )
    .subscribe(
      (response)=>{
        this.isLoading = false;
        this.toastr.success("Councellor Edited Successfully");
      },
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Councellor Cannot be Edited");
      }
    )
  }
}
