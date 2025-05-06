import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.css']
})


export class EditChecklistComponent implements OnInit {

  checklist : Object = {};
  isLoading:Boolean = false;
  constructor(private http: HttpClient,private toastr : ToastrService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.getChecklist();
  }

  getChecklist(){
    this.isLoading = true;
    const checklistId : String = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:8080/api/checklist/getsinglechecklist/"+checklistId)
    .subscribe(
      (response)=>{
        console.log(response);
        this.checklist = response;
        this.isLoading = false;
      },
      (error)=>{
        console.log(error);
        this.toastr.error("Error Fetching Checklist")
        this.isLoading = false;
      }
    )
  }

  onChecklistNameChange(event:Event){
    console.log(this.checklist);
  }

  editChecklist(){
    this.isLoading = true;
    const checklistId : String = this.route.snapshot.paramMap.get('id');
    this.http.put("http://localhost:8080/api/checklist/update/"+checklistId,
      {
        name:this.checklist["name"],
        description:this.checklist["description"]
      }
    )
    .subscribe(
      (response)=>{
        this.isLoading = false;
        this.toastr.success("Checklist Edited Successfully");
      },
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Checklist Cannot be Edited");
      }
    )
  }
}
