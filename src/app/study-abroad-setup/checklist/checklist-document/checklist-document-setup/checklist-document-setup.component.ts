import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from '@angular/core/src/render3/instructions';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-checklist-document-setup',
  templateUrl: './checklist-document-setup.component.html',
  styleUrls: ['./checklist-document-setup.component.css']
})
export class ChecklistDocumentSetupComponent implements OnInit {

  checklistDocuments = new MatTableDataSource<any>([]);
  selectedDocument = 0;
  checklist: Object = {};
  checklistDocumentDropdown: any[];
  displayedColumns: String[] = ["SrNo", "documentTypeName", "documentTypeDescription", "isRequired", "deleteDocument"]

  isLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private toastr: ToastrService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.getAllChecklistDocuments();
    this.getChecklistDocumentDropDown();
    this.getChecklist();
  }

  ngAfterViewInit() {
    this.checklistDocuments.paginator = this.paginator;
  }

  getAllChecklistDocuments() {
    this.isLoading = true;
    const checklistId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/checklist/getchecklistdocuments/" + checklistId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.checklistDocuments.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Checklist Documents");
        }
      )
  }

  onIsRequiredChange(element: any[]) {

    const isRequired: Boolean = element["isRequired"];
    const checklistDocumentId: Number = element["checklistDocumentId"];

    this.isLoading = true;
    this.http.put("http://localhost:8080/api/checklist/updatechecklistdocumentrequired", {
      isRequired:isRequired,
      checklistDocumentId:checklistDocumentId
    })
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success("Required Status Updated Successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Failed To Update Required Status");
          this.isLoading = false;
        }
      );
  }

  getChecklistDocumentDropDown() {
    this.isLoading = true;
    const checklistId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/checklist/getchecklistdocumentsdropdown/" + checklistId)
      .subscribe(
        (response) => {
          this.checklistDocumentDropdown = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Documents Dropdown");
        }
      )
  }

  addCountryChecklist() {
    this.isLoading = true;
    const checklistId: String = this.route.snapshot.paramMap.get('id');

    this.http.post<any[]>("http://localhost:8080/api/checklist/addchecklistdocument", {
      checklistId: checklistId,
      documentTypeId: this.selectedDocument,
      isRequired: true
    })
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getAllChecklistDocuments();
          this.getChecklistDocumentDropDown();
          this.selectedDocument = 0;
          this.toastr.success("Document added to Checklist");
        },
        (error) => {
          this.isLoading = false;
          this.selectedDocument = 0;
          this.toastr.error("Error Adding Document to Checklist");
        }
      )
  }

  removeChecklistDocumentBtn(checklistDocumentId: String) {
    this.isLoading = true;
    this.http.delete("http://localhost:8080/api/checklist/removechecklistdocument/" + checklistDocumentId)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getAllChecklistDocuments();
          this.getChecklistDocumentDropDown();
          this.selectedDocument = 0;
          this.toastr.success("Document Removed Successfully");
        },
        (error) => {
          this.isLoading = false;
          this.selectedDocument = 0;
          this.toastr.error("Error Removing Document");
        }
      )
  }

  getChecklist() {
    this.isLoading = true;
    const checklistId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`http://localhost:8080/api/checklist/getsinglechecklist/${checklistId}`)
      .subscribe(
        (response) => {
          this.checklist = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching Checklist");
          this.isLoading = false;
        }
      );
  }
}
