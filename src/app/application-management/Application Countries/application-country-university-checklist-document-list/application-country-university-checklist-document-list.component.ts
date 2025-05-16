import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-country-university-checklist-document-list',
  templateUrl: './application-country-university-checklist-document-list.component.html',
  styleUrls: ['./application-country-university-checklist-document-list.component.css']
})
export class ApplicationCountryUniversityChecklistDocumentListComponent implements OnInit {

  displayedColumns: String[] = ["SrNo", "documentTypeName","documentTypeDescription", "isVerified", "filePath"];

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  university: Object = {};
  checklist: Object = {};
  appId = this.route.snapshot.paramMap.get('appId');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchDocuments();
    this.getUniversity();
    this.getChecklist();
  }

  formatDateForNgModel(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  getUniversity(){
    this.isLoading = true;
    let universityId = this.route.snapshot.paramMap.get('universityId');
    this.http.get<any[]>('http://localhost:8080/api/university/getsingleuniversity/' + universityId)
      .subscribe(
        (response) => {
          this.university = response;
        },
        (error) => {
          console.error('Error fetching University:', error);
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
    let universityChecklistId = this.route.snapshot.paramMap.get('universityChecklistId');
    this.http.get<any[]>('http://localhost:8080/api/application/university/checklist/getAllApplicationUniversityChecklistDocuments/'+universityChecklistId)
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
    const appUniversityChecklistDocumentMappingId: Number = element["appUniversityChecklistDocumentMappingId"];
    
      this.http.put("http://localhost:8080/api/application/updateUniversityChecklistDocumentVerifiedStatus", {
        appUniversityChecklistDocumentMappingId: appUniversityChecklistDocumentMappingId,
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
}
