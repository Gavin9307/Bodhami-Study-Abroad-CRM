import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  constructor(private http: HttpClient,private toastr : ToastrService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCouncellor();
  }

  councellor: Object = {}
  isLoading : Boolean = false;

  getCouncellor(){
    this.isLoading = true;
    let councellorId = 0;
    const userId = localStorage.getItem('userId'); // returns a string or null
    if (userId) {
      councellorId = +userId; // converts to number if needed
    } else {
      console.warn('User ID not found in localStorage');
    }
    this.http.get("http://localhost:8080/api/councellor/getsinglecouncellor/"+councellorId)
    .subscribe(
      (response)=>{
        this.councellor = response;
        // console.log(this.councellor);
        this.isLoading = false;
      },
      (error)=>{
        this.toastr.error("Error fetching details of councellor");
        this.isLoading = false;
      }
    )
  }
  
  updateDetails() {
    this.isLoading = true;
    let councellorId = 0;
    const userId = localStorage.getItem('userId'); // returns a string or null
    if (userId) {
      councellorId = +userId; // converts to number if needed
    } else {
      console.warn('User ID not found in localStorage');
    }
    this.http.put("http://localhost:8080/api/councellor/editcouncellor/"+councellorId,this.councellor)
    .subscribe(
      (response)=>{
        this.toastr.success("Councellor Details Updated Successfully");
        this.getCouncellor();
        this.isLoading = false;
        
      },
      (error)=>{
        this.toastr.error("Error Updating Councellor Details");
        this.getCouncellor();
        this.isLoading = false;
      }
    )
  }
  
  

  onSubmit(): void {
  }

  onFileSelected(event: any): void {
    console.log("File selected:", event.target.files[0]);
  }

}
