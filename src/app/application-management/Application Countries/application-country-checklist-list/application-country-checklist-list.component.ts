import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ApplicationCountryChecklistActionComponent } from '../application-country-checklist-action/application-country-checklist-action.component';

@Component({
  selector: 'app-application-country-checklist-list',
  templateUrl: './application-country-checklist-list.component.html',
  styleUrls: ['./application-country-checklist-list.component.css']
})
export class ApplicationCountryChecklistListComponent implements OnInit {
  displayedColumns: String[] = ["SrNo", "checklistName","checklistDescription", "createdAt", "isDeleted", "action"];

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  country: Object = {};
  appId = this.route.snapshot.paramMap.get('appId');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchChecklists();
    this.getCountry();
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
          
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching Country:', error);
          this.isLoading = false;
        }
      );
  }

  fetchChecklists() {
    this.isLoading = true;
    let countryId = this.route.snapshot.paramMap.get('countryId');
    let appId = this.route.snapshot.paramMap.get('appId');
    this.http.get<any[]>('http://localhost:8080/api/application/country/'+countryId+'/getallapplicationcountrychecklists/'+appId)
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
    this.dialog.open(ApplicationCountryChecklistActionComponent, {
      width: '400px',
      data: element
    });
  }
}
