import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.css']
})
export class AddDocumentTypeComponent implements OnInit {

  constructor(private http: HttpClient,private toastr : ToastrService) { }
  
    ngOnInit() {}
  
    documentTypeName : String = "";
    documentTypeDescription : String = "";
  
    isLoading : Boolean = false;
  
    addDocumentType(){
      this.isLoading = true;
      this.http.post("http://localhost:8080/api/documenttype/adddocumenttype",{
        documentTypeName: this.documentTypeName,
        documentTypeDescription: this.documentTypeDescription
      })
      .subscribe(
        (response)=>{
          this.toastr.success("Document Type Created successfully");
          this.isLoading = false;
        },
        (error)=>{
          this.toastr.error("Document Type cannot be added");
          this.isLoading = false;
        }
      )
    }

}
