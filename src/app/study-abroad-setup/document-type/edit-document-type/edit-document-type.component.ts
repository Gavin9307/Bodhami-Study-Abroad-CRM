import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrls: ['./edit-document-type.component.css']
})
export class EditDocumentTypeComponent implements OnInit {

  documentType : Object = {};
  isLoading:Boolean = false;
  constructor(private http: HttpClient,private toastr : ToastrService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.getDocumentType();
  }

  getDocumentType(){
    this.isLoading = true;
    const documentTypeId : String = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:8080/api/documenttype/getsingledocumenttype/"+documentTypeId)
    .subscribe(
      (response)=>{
        this.documentType = response;
        this.isLoading = false;
      },
      (error)=>{
        this.toastr.error("Error Fetching Document Type")
        this.isLoading = false;
      }
    )
  }

  editDocumentType(){
    this.isLoading = true;
    const documentTypeId : String = this.route.snapshot.paramMap.get('id');
    this.http.put("http://localhost:8080/api/documenttype/editdocumenttype/"+documentTypeId,
      {
        documentTypeName:this.documentType["documentTypeName"],
        documentTypeDescription:this.documentType["documentTypeDescription"],
      }
    )
    .subscribe(
      (response)=>{
        this.isLoading = false;
        this.toastr.success("Document Type Edited Successfully");
      },
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Document Type Cannot be Edited");
      }
    )
  }

}
