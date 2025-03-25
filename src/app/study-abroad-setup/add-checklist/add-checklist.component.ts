import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.css']
})
export class AddChecklistComponent implements OnInit {

  constructor(private http: HttpClient,private toastr : ToastrService) { }

  ngOnInit() {}

  checklistName : String = "";
  checklistDescription : String = "";

  isLoading : Boolean = false;

  addChecklist(){
    this.isLoading = true;
    this.http.post("http://localhost:8080/api/checklist/add",{
      name: this.checklistName,
      description: this.checklistDescription,
      required: true,
      councellorID: 1
    })
    .subscribe(
      (response)=>{
        this.toastr.success("Checklist added successfully");
        this.isLoading = false;
      },
      (error)=>{
        this.toastr.error("Checklist cannot be added");
        this.isLoading = false;
      }
    )
  }
}
