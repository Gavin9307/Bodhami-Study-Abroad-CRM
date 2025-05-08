import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})

export class EditCountryComponent implements OnInit {

  country: Object = {};

  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCountry();
  }

  getCountry() {
    this.isLoading = true;
    const countryId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`http://localhost:8080/api/country/getsinglecountry/${countryId}`)
      .subscribe(
        (response) => {
          this.country = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching Country");
          this.isLoading = false;
        }
      );
  }

  editCountry() {
    this.isLoading = true;
    const countryId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.put(`http://localhost:8080/api/country/editcountry/${countryId}`,this.country)
      .subscribe(
        (response) => {
          this.toastr.success("Country Edited Successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Failed to Edit Country");
          this.isLoading = false;
        }
      );
  }
}

