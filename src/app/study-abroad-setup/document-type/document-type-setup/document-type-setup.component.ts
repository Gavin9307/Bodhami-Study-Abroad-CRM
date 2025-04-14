import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document-type-setup',
  templateUrl: './document-type-setup.component.html',
  styleUrls: ['./document-type-setup.component.css']
})
export class DocumentTypeSetupComponent implements OnInit {

  documentTypes: any[] = [];

  displayedColumns: String[] = ["SrNo", "documentTypeName", "documentTypeDescription", "editDocumentType","deleteDocumentType"]

  isLoading: Boolean = false;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllDocumentTypes();
  }

  getAllDocumentTypes() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/documenttype/getalldocumenttypes")
      .subscribe(
        (response) => {
          this.documentTypes = response;
          // console.log(this.documentTypes);
          this.documentTypes.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.isLoading = false;
        },
        (error) => {
          // console.log("Error Fetching checklists. Reason : " + error.message);
          this.isLoading = false;
          this.toastr.error("Error Fetching Document Types");
        }
      )
  }

  deleteDocumentTypeBtn(documentTypeId: String) {
    this.isLoading = true;
    this.http.delete("http://localhost:8080/api/documenttype/deletedocumenttype/" + documentTypeId)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success("Document Type Deleted Successfully");
          this.getAllDocumentTypes();
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Deleting Document Type");
        }
      )
  }
}
