import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchCountries();
  }
  countries: any[] = [];

  isLoading: boolean = false;

  universityName: string = '';
  universityEmail: string = '';
  universityWebsite: string = '';
  nationalRanking: number | null = null;
  stateRanking: number | null = null;
  description: string = '';
  yearOfEstablishment: number | null = null;
  brochure: string = '';
  universityExam: string = '';
  countryId: number | null = null;
  address: string = '';

  addUniversity() {
    this.isLoading = true;

    const payload = {
      universityName: this.universityName,
      universityEmail: this.universityEmail,
      universityWebsite: this.universityWebsite,
      nationalRanking: this.nationalRanking,
      stateRanking: this.stateRanking,
      description: this.description,
      yearOfEstablishment: this.yearOfEstablishment,
      brochure: this.brochure,
      universityExam: this.universityExam,
      countryId: this.countryId,
      address: this.address,
      councellorId: 1
    };

    this.http.post("http://localhost:8080/api/university/adduniversity", payload)
      .subscribe(
        (response) => {
          this.toastr.success("University Created successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("University Already Exists");
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
