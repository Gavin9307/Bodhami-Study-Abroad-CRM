import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChecklistActionComponent } from '../checklist-action/checklist-action.component';

@Component({
  selector: 'app-checklist-setup',
  templateUrl: './checklist-setup.component.html',
  styleUrls: ['./checklist-setup.component.css']
})



export class ChecklistSetupComponent implements OnInit {
  
  checklists:any[]  = [];

  displayedColumns : String[] = ["SrNo","checklistName","checklistDescription","isDeleted","action"]
  
  isLoading:Boolean = false;


  constructor(private http: HttpClient,private toastr : ToastrService,private dialog : MatDialog) {}
  
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
          this.toastr.success("Checklist Status Set to Inactive");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Failed to Set Checklist Status to Inactive");
          this.isLoading = false;
        }
      );
    }
    else{
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/checklist/restore/"+checklistId,{})
      .subscribe(
        response => {
          this.toastr.success("Checklist Status Set to Active");
          this.isLoading = false;
        },
        error => {
          this.toastr.error("Failed to Set Checklist Status to Active");
          this.isLoading = false;
        }
      );
    }
  }

  openDialog(element: any): void {
    const dialogRef: MatDialogRef<ChecklistActionComponent> = this.dialog.open(ChecklistActionComponent, {
      width: '400px',
      data: element
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.getAllChecklists(); 
    });
    }


}
