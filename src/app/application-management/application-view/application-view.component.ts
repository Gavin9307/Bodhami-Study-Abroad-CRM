import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from '@angular/core/src/render3/instructions';
import { ActivatedRoute } from '@angular/router';
import { ApplicationViewCountryActionComponent } from '../application-view-country-action/application-view-country-action.component';
@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService, private dialog: MatDialog, private route: ActivatedRoute) { }
  @ViewChild('addressesPaginator') addressesPaginator!: MatPaginator;
  @ViewChild('medicalsPaginator') medicalsPaginator!: MatPaginator;
  @ViewChild('guardiansPaginator') guardiansPaginator!: MatPaginator;
  @ViewChild('experiencesPaginator') experiencesPaginator!: MatPaginator;
  @ViewChild('educationsPaginator') educationsPaginator!: MatPaginator;
  @ViewChild('optionalCoursesPaginator') optionalCoursesPaginator!: MatPaginator;
  @ViewChild('documentsPaginator') documentsPaginator!: MatPaginator;
  @ViewChild('countriesPaginator') countriesPaginator!: MatPaginator;

  isLoading: Boolean = false;
  applicationDetails: Object = {};

  addresses = new MatTableDataSource<any>([]);
  addressesDisplayedColumns: String[] = ["SrNo", "country", "state", "city", "streetAddress", "landmark", "pinCode"];

  medicals = new MatTableDataSource<any>([]);
  medicalsDisplayedColumns: String[] = ["SrNo", "medicalIssue", "hasDisability"];

  guardians = new MatTableDataSource<any>([]);
  guardiansDisplayedColumns: String[] = ["SrNo", "firstName", "middleName", "lastName", "phoneNumber", "email"];

  experiences = new MatTableDataSource<any>([]);
  experiencesDisplayedColumns: String[] = ["SrNo", "title", "currentDesignation", "company", "country", "description", "startDate", "endDate"];

  educations = new MatTableDataSource<any>([]);
  educationsDisplayedColumns: String[] = ["SrNo", "school", "educationLevel", "fieldOfStudy", "country", "state", "startDate", "endDate"];

  optionalCourses = new MatTableDataSource<any>([]);
  optionalCoursesDisplayedColumns: String[] = ["SrNo", "title", "certificate", "level", "startDate", "endDate"];

  countries = new MatTableDataSource<any>([]);
  countriesDisplayedColumns: String[] = ["SrNo", "country", "createdAt", "isDeleted", "action"];

  ngOnInit() {
    this.getApplicationDetails();
    this.getAllAddresses();
    this.getAllMedicals();
    this.getAllGuardians();
    this.getAllExperiences();
    this.getAllEducations();
    this.getAllOptionalCourses();
    this.getAllContries();
  }
  ngAfterViewInit() {
    this.addresses.paginator = this.addressesPaginator;
    this.medicals.paginator = this.medicalsPaginator;
    this.guardians.paginator = this.guardiansPaginator;
    this.experiences.paginator = this.experiencesPaginator;
    this.educations.paginator = this.educationsPaginator;
    this.optionalCourses.paginator = this.optionalCoursesPaginator;
  }

  statusOptions: string[] = ['in-progress', 'submitted', 'approved', 'rejected'];

  getStatusClass(status: string | undefined | null): string {
    if (!status) return '';

    switch (status.toLowerCase()) {
      case 'in-progress':
        return 'status-in-progress';
      case 'submitted':
        return 'status-submitted';
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }

  openDialog(element: any): void {
    this.dialog.open(ApplicationViewCountryActionComponent, {
      width: '400px',
      data: element
    });
  }

  formatDateForNgModel(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getApplicationDetails() {
    this.isLoading = true;
    const appId: String = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:8080/api/application/getsingleapplication/" + appId)
      .subscribe(
        (response) => {
          const timestamp = response["dateOfBirth"];
          const date = new Date(timestamp);
          response["dateOfBirth"] = this.formatDateForNgModel(date);
          this.applicationDetails = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching User Details");
          this.isLoading = false;
        }
      )
  }

  getAllAddresses() {
    this.isLoading = true;
    const appId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/application/address/getapplicationaddresses/" + appId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.addresses.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Addresses");
        }
      )
  }

  getAllMedicals() {
    this.isLoading = true;
    const appId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/application/medical/getapplicationmedicals/" + appId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.medicals.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Medical Details");
        }
      )
  }

  getAllGuardians() {
    this.isLoading = true;
    const appId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/application/guardian/getapplicationguardians/" + appId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.guardians.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Guardians Details");
        }
      )
  }

  getAllExperiences() {
    this.isLoading = true;
    const appId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/application/experience/getapplicationexperiences/" + appId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;

            const startDatetimestamp = element["startDate"];
            const startDate = new Date(startDatetimestamp);
            element["startDate"] = this.formatDateForNgModel(startDate);

            const endDatetimestamp = element["endDate"];
            const endDate = new Date(endDatetimestamp);
            element["endDate"] = this.formatDateForNgModel(endDate);
          });
          this.experiences.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Experiences Details");
        }
      )
  }

  getAllEducations() {
    this.isLoading = true;
    const appId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/application/education/getallapplicationeducation/" + appId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;

            const startDatetimestamp = element["startDate"];
            const startDate = new Date(startDatetimestamp);
            element["startDate"] = this.formatDateForNgModel(startDate);

            const endDatetimestamp = element["endDate"];
            const endDate = new Date(endDatetimestamp);
            element["endDate"] = this.formatDateForNgModel(endDate);
          });
          this.educations.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Education Details");
        }
      )
  }

  getAllOptionalCourses() {
    this.isLoading = true;
    const appId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/application/optionalcourse/getallapplicationoptionalcourses/" + appId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;

            const startDatetimestamp = element["startDate"];
            const startDate = new Date(startDatetimestamp);
            element["startDate"] = this.formatDateForNgModel(startDate);

            const endDatetimestamp = element["endDate"];
            const endDate = new Date(endDatetimestamp);
            element["endDate"] = this.formatDateForNgModel(endDate);
          });
          this.optionalCourses.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Optional Courses Details");
        }
      )
  }

  getAllContries() {
    this.isLoading = true;
    const appId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/application/country/getallapplicatincountries/" + appId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;

            const createdAttimestamp = element["createdAt"];
            const createdAt = new Date(createdAttimestamp);
            element["createdAt"] = this.formatDateForNgModel(createdAt);
          });
          this.countries.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Countries Details");
        }
      )
  }


}
