import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-university',
  templateUrl: './edit-university.component.html',
  styleUrls: ['./edit-university.component.css']
})
export class EditUniversityComponent implements OnInit {
  university: Object = {};

  isLoading: boolean = false;

  countries: any[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUniversity();
    this.fetchCountries();
  }

  getUniversity() {
    this.isLoading = true;
    const universityId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`http://localhost:8080/api/university/getsingleuniversity/${universityId}`)
      .subscribe(
        (response) => {
          this.university = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching University");
          this.isLoading = false;
        }
      );
  }

  editUniversity() {
    this.isLoading = true;
    const universityId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.put(`http://localhost:8080/api/university/edituniversity/${universityId}`,this.university)
      .subscribe(
        (response) => {
          this.toastr.success("University Edited Successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Failed to Edit University");
          this.isLoading = false;
        }
      );
  }

  fetchCountries() {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:8080/api/country/getallcountries')
      .subscribe(
        (data) => {
          this.countries = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching countries:', error);
          this.isLoading = false;
        }
      );
  }
}
