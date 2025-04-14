import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CountryActionComponent } from '../country-action/country-action.component';

export interface CountryElement {
  countryId: number;
  countryName: string;
  countryCode: string;
  currencyName: string;
  multiplicationFactor: number;
  createdAt: number;
  updatedAt: number;
  deleted: boolean;
}

@Component({
  selector: 'app-country-setup',
  templateUrl: './country-setup.component.html',
  styleUrls: ['./country-setup.component.css']
})
export class CountrySetupComponent implements OnInit {
  displayedColumns: string[] = [
    'countryName',
    'countryCode',
    'currencyName',
    'multiplicationFactor',
    'isDeleted',
    'action'
  ];
  
  dataSource = new MatTableDataSource<CountryElement>([]);
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.isLoading = true;
    this.http.get<CountryElement[]>('http://localhost:8080/api/countries/getallcountries')
      .subscribe(
        (data) => {
          this.dataSource.data = data.map(item => ({
            ...item,
            isDeleted: item.deleted
          }));
          this.dataSource.paginator = this.paginator; // Set paginator after fetching data
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching countries:', error);
          this.isLoading = false;
        }
      );
  }

  toggleDeleteStatus(element: CountryElement) {
    const newStatus = !element.deleted;
    const url = newStatus
      ? `http://localhost:8080/api/countries/deletecountry/${element.countryId}`
      : `http://localhost:8080/api/countries/recovercountry/${element.countryId}`;

    this.isLoading = true;
    this.http.put(url, {}, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('Response:', response); // Log response for debugging
        element.deleted = newStatus; // Instantly update UI
        this.isLoading = false;
      },
      (error) => {
        console.error('Error updating delete status:', error);
        this.isLoading = false;
      }
    );
  }

  openDialog(): void {
    this.dialog.open(CountryActionComponent, {
      width: '400px'
    });
  }
}
