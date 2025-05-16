import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ApplicationCountryChecklistActionComponent } from '../application-country-checklist-action/application-country-checklist-action.component';
import { ApplicationCountryUniversityChecklistActionComponent } from '../application-country-university-checklist-action/application-country-university-checklist-action.component';

@Component({
  selector: 'app-application-country-university-checklist-list',
  templateUrl: './application-country-university-checklist-list.component.html',
  styleUrls: ['./application-country-university-checklist-list.component.css']
})
export class ApplicationCountryUniversityChecklistListComponent implements OnInit {
 displayedColumns: String[] = ["SrNo", "checklistName","checklistDescription", "createdAt", "action"];

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  university: Object = {};
  appId = this.route.snapshot.paramMap.get('appId');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchChecklists();
    this.getUniversity();
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
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching University:', error);
          this.isLoading = false;
        }
      );
  }

  fetchChecklists() {
    this.isLoading = true;
    let universityId = this.route.snapshot.paramMap.get('universityId');
    let appId = this.route.snapshot.paramMap.get('appId');
    this.http.get<any[]>('http://localhost:8080/api/application/university/'+universityId+'/getallapplicationuniversitychecklists/'+appId)
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
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching Checklists:', error);
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

  openDialog(element: any): void {
    element["countryId"] = this.route.snapshot.paramMap.get('countryId');
    element["universityId"] = this.route.snapshot.paramMap.get('universityId');
    element["appId"] = this.route.snapshot.paramMap.get('appId');
    this.dialog.open(ApplicationCountryUniversityChecklistActionComponent, {
      width: '400px',
      data: element
    });
  }
}
