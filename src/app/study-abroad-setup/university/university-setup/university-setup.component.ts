import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UniversityActionComponent } from '../university-action/university-action.component';


@Component({
  selector: 'app-university-setup',
  templateUrl: './university-setup.component.html',
  styleUrls: ['./university-setup.component.css']
})
export class UniversitySetupComponent implements OnInit {
  displayedColumns: string[] = [
      'SrNo',
      'universityName',
      'universityEmail',
      'universityWebsite',
      'countryName',
      'isDeleted',
      'action'
    ];
  
    dataSource = new MatTableDataSource<any>([]);
    isLoading: boolean = false;
    originalData = [];
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService) { }
  
    ngOnInit() {
      this.fetchUniversities();
    }
  
    fetchUniversities() {
      this.isLoading = true;
      this.http.get<any[]>('http://localhost:8080/api/university/getalluniversities')
        .subscribe(
          (data) => {
            data.forEach((element, index) => {
              element["SrNo"] = index + 1;
            });
            this.originalData = data;
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching Universities:', error);
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
      this.dialog.open(UniversityActionComponent, {
        width: '400px',
        data: element
      });
    }
}
