import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-application-country-checklist-document-list',
  templateUrl: './application-country-checklist-document-list.component.html',
  styleUrls: ['./application-country-checklist-document-list.component.css']
})
export class ApplicationCountryChecklistDocumentListComponent implements OnInit {
  displayedColumns: String[] = ["SrNo", "documentTypeName","documentTypeDescription", "isVerified", "filePath"];

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  country: Object = {};
  checklist: Object = {};
  appId = this.route.snapshot.paramMap.get('appId');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchDocuments();
    this.getCountry();
    this.getChecklist();
  }

  formatDateForNgModel(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  getCountry(){
    this.isLoading = true;
    let countryId = this.route.snapshot.paramMap.get('countryId');
    this.http.get<any[]>('http://localhost:8080/api/country/getsinglecountry/' + countryId)
      .subscribe(
        (response) => {
          this.country = response;
        },
        (error) => {
          console.error('Error fetching Country:', error);
        }
      );
  }

  getChecklist(){
    this.isLoading = true;
    let checklistId = this.route.snapshot.paramMap.get('checklistId');
    this.http.get<any[]>('http://localhost:8080/api/checklist/getsinglechecklist/' + checklistId)
      .subscribe(
        (response) => {
          this.checklist = response;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching Country Checklist:', error);
          this.isLoading = false;
        }
      );
  }

  fetchDocuments() {
    this.isLoading = true;
    let countryChecklistId = this.route.snapshot.paramMap.get('countryChecklistId');
    this.http.get<any[]>('http://localhost:8080/api/application/country/checklist/getAllApplicationCountryChecklistDocuments/'+countryChecklistId)
      .subscribe(
        (data) => {
          data.forEach((element, index) => {
            element["SrNo"] = index + 1;
            const createdAttimestamp = element["createdAt"];
            const createdAt = new Date(createdAttimestamp);
            element["createdAt"] = this.formatDateForNgModel(createdAt);
          });
          
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.error('Error fetching Checklist Documents:', error);
        }
      );
  }

  onIsVerifiedChange(element: any[]) {
    this.isLoading = true;
    const isVerified: Boolean = element["isVerified"];
    const appCountryChecklistDocumentMappingId: Number = element["appCountryChecklistDocumentMappingId"];
    
      this.http.put("http://localhost:8080/api/application/updateCountryChecklistDocumentVerifiedStatus", {
        appCountryChecklistDocumentMappingId: appCountryChecklistDocumentMappingId,
        isVerified: isVerified
      })
        .subscribe(
          (response) => {
            this.toastr.success("Document Status Updated");
            this.isLoading = false;
          },
          (error) => {
            this.toastr.error("Failed to Updated Document Status");
            this.isLoading = false;
          }
        );
  }

  toggleDeleteStatus(element: any[]) {

    const isDeleted: Boolean = element["isDeleted"];
    const universityId: Number = element["universityId"];

    if (isDeleted == true) {
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/university/softdelete/" + universityId, {})
        .subscribe(
          (response) => {
            console.log(response);
            this.toastr.success("University Status Set to Inactive");
            this.isLoading = false;
          },
          (error) => {
            this.toastr.error("Failed to Set University Status to Inactive");
            this.isLoading = false;
          }
        );
    }
    else {
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/university/softrecover/" + universityId, {})
        .subscribe(
          response => {
            this.toastr.success("University Status Set to Active");
            this.isLoading = false;
          },
          error => {
            this.toastr.error("Failed to Set University Status to Active");
            this.isLoading = false;
          }
        );
    }
  }
}
