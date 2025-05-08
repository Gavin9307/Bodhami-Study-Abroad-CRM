import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checklist-setup',
  templateUrl: './checklist-setup.component.html',
  styleUrls: ['./checklist-setup.component.css']
})



export class ChecklistSetupComponent implements OnInit {
  
  checklists:any[]  = [];

  displayedColumns : String[] = ["SrNo","checklistName","checklistDescription","isDeleted","editChecklist"]
  
  isLoading:Boolean = false;


  constructor(private http: HttpClient,private toastr : ToastrService) {}
  
  ngOnInit() {
    this.getAllChecklists();
  }

  getAllChecklists(){
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/checklist/getallchecklistsetup")
    .subscribe(
      (response)=>{
        this.checklists = response;
        console.log(this.checklists);
        this.checklists.forEach((element,index) => {
          element["SrNo"] = index+1;
        });
        console.log(this.checklists);
        this.isLoading = false;
      },
      (error)=>{
        console.log("Error Fetching checklists. Reason : " + error.message);
        this.isLoading = false;
        this.toastr.error("Error Fetching checklists");
      }
    )
  }
 
  onIsDeletedChange(element : any[]){
    
    
    const isDeleted:Boolean = element["deleted"];
    const checklistId:Number = element["checklistID"];

    if(isDeleted == true){
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/checklist/delete/"+checklistId,{})
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success("Checklist Deleted Successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Checklist Cannot be Deleted");
          this.isLoading = false;
        }
      );
    }
    else{
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/checklist/restore/"+checklistId,{})
      .subscribe(
        response => {
          this.toastr.success("Checklist Recovered Successfully");
          this.isLoading = false;
        },
        error => {
          this.toastr.error("Checklist Cannot be Recovered");
          this.isLoading = false;
        }
      );
    }
  }
}
