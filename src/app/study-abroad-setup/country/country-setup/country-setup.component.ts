import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CountryActionComponent } from '../country-action/country-action.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country-setup',
  templateUrl: './country-setup.component.html',
  styleUrls: ['./country-setup.component.css']
})
export class CountrySetupComponent implements OnInit {
  displayedColumns: string[] = [
    'SrNo',
    'countryName',
    'countryCode',
    'countryCurrencyName',
    'countryMultiplicationFactor',
    'isDeleted',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:8080/api/country/getallcountries')
      .subscribe(
        (data) => {
          data.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching countries:', error);
          this.isLoading = false;
        }
      );
  }

  toggleDeleteStatus(element: any[]) {

    const isDeleted: Boolean = element["isDeleted"];
    const countryId: Number = element["countryId"];

    if (isDeleted == true) {
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/country/softdelete/" + countryId, {})
        .subscribe(
          (response) => {
            console.log(response);
            this.toastr.success("Country Deleted Successfully");
            this.isLoading = false;
          },
          (error) => {
            this.toastr.error("Country Cannot be Deleted");
            this.isLoading = false;
          }
        );
    }
    else {
      this.isLoading = true;
      this.http.put("http://localhost:8080/api/country/softrecover/" + countryId, {})
        .subscribe(
          response => {
            this.toastr.success("Country Recovered Successfully");
            this.isLoading = false;
          },
          error => {
            this.toastr.error("Country Cannot be Recovered");
            this.isLoading = false;
          }
        );
    }
  }

  openDialog(element: any): void {
    this.dialog.open(CountryActionComponent, {
      width: '400px',
      data: element
    });
  }
}
