import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {}

  isLoading: boolean = false;

  countryName: string = '';
  countryCode: string = '';
  countryCurrencyName: string = '';
  countryMultiplicationFactor: number = 0;
  createdBy: number = 1;
  updatedBy: number = 1;
  isoCountryCode: string = '';
  websiteDisplayCurrency: string = '';

  addCountry() {
    this.isLoading = true;

    const payload = {
      countryName: this.countryName,
      countryCode: this.countryCode,
      countryCurrencyName: this.countryCurrencyName,
      countryMultiplicationFactor: this.countryMultiplicationFactor,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      isoCountryCode: this.isoCountryCode,
      websiteDisplayCurrency: this.websiteDisplayCurrency
    };

    this.http.post("http://localhost:8080/api/country/addcountry", payload)
      .subscribe(
        (response) => {
          this.toastr.success("Country Created successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Country Already Exists");
          this.isLoading = false;
        }
      );
  }
}

