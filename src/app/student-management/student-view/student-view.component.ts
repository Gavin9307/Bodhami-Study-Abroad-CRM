import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from '@angular/core/src/render3/instructions';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  constructor(private http: HttpClient,private toastr : ToastrService,private dialog:MatDialog,private route: ActivatedRoute) {}
  @ViewChild('addressesPaginator') addressesPaginator!: MatPaginator;
  @ViewChild('medicalsPaginator') medicalsPaginator!: MatPaginator;
  @ViewChild('guardiansPaginator') guardiansPaginator!: MatPaginator;
  @ViewChild('experiencesPaginator') experiencesPaginator!: MatPaginator;
  @ViewChild('educationsPaginator') educationsPaginator!: MatPaginator;
  @ViewChild('optionalCoursesPaginator') optionalCoursesPaginator!: MatPaginator;
  @ViewChild('documentsPaginator') documentsPaginator!: MatPaginator;
  
  isLoading:Boolean = false; 

  user : Object = {};
  userBasicDetails : Object = {};

  addresses = new MatTableDataSource<any>([]);
  addressesDisplayedColumns : String[] = ["SrNo","country","state","city","streetAddress","landmark","pinCode"];

  medicals = new MatTableDataSource<any>([]);
  medicalsDisplayedColumns : String[] = ["SrNo","medicalIssue","hasDisability"];

  guardians = new MatTableDataSource<any>([]);
  guardiansDisplayedColumns : String[] = ["SrNo","firstName","middleName","lastName","phoneNumber","email"];

  experiences = new MatTableDataSource<any>([]);
  experiencesDisplayedColumns : String[] = ["SrNo","title","currentDesignation","company","country","description","startDate","endDate"];

  educations = new MatTableDataSource<any>([]);
  educationsDisplayedColumns : String[] = ["SrNo","school","educationLevel","fieldOfStudy","country","state","startDate","endDate"];

  optionalCourses = new MatTableDataSource<any>([]);
  optionalCoursesDisplayedColumns : String[] = ["SrNo","title","certificate","level","startDate","endDate"];

  documents = new MatTableDataSource<any>([]);
  documentsDisplayedColumns : String[] = ["SrNo","documentTypeName","documentTypeDescription","documentUrl"];

  ngOnInit() {
    this.getUserDetails();
    this.getUserBasicDetails();
    this.getAllAddresses();
    this.getAllMedicals();
    this.getAllGuardians();
    this.getAllExperiences();
    this.getAllEducations();
    this.getAllOptionalCourses();
    this.getAllDocuments();
  }
  ngAfterViewInit() {
    this.addresses.paginator = this.addressesPaginator;
    this.medicals.paginator = this.medicalsPaginator;
    this.guardians.paginator = this.guardiansPaginator;
    this.experiences.paginator = this.experiencesPaginator;
    this.educations.paginator = this.educationsPaginator;
    this.optionalCourses.paginator = this.optionalCoursesPaginator;
    this.documents.paginator = this.documentsPaginator;
  }

  formatDateForNgModel(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getUserDetails(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:8080/api/user/getsingleuser/"+userId)
    .subscribe(
      (response)=>{
        this.user = response;
        this.isLoading = false;
      },
      (error)=>{
        this.toastr.error("Error Fetching User Details");
        this.isLoading = false;
      }
    )
  }

  getUserBasicDetails(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:8080/api/user/basicdetails/getSingleUserBasicDetails/"+userId)
    .subscribe(
      (response)=>{
        const timestamp = response["dateOfBirth"];
        const date = new Date(timestamp);
        response["dateOfBirth"] = this.formatDateForNgModel(date);
        this.userBasicDetails = response;
        this.isLoading = false;
      },
      (error)=>{
        this.toastr.error("Error Fetching User Details");
        this.isLoading = false;
      }
    )
  }

  getAllAddresses(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/user/address/getuseraddresses/"+userId)
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;
        });
        this.addresses.data = response;
        this.isLoading = false;
      },
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Error Fetching Addresses");
      }
    )
  }

  getAllMedicals(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/user/medical/getusermedicals/"+userId)
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;
        });
        this.medicals.data = response;
        this.isLoading = false;
      },
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Error Fetching Medical Details");
      }
    )
  }

  getAllGuardians(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/user/guardian/getuserguardians/"+userId)
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;
        });
        this.guardians.data = response;
        this.isLoading = false;
      },
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Error Fetching Guardians Details");
      }
    )
  }

  getAllExperiences(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/user/experience/getuserexperiences/"+userId)
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;

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
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Error Fetching Experiences Details");
      }
    )
  }

  getAllEducations(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/user/education/getallusereducation/"+userId)
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;

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
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Error Fetching Education Details");
      }
    )
  }

  getAllOptionalCourses(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/user/optionalcourse/getalluseroptionalcourses/"+userId)
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;

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
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Error Fetching Optional Courses Details");
      }
    )
  }

  getAllDocuments(){
    this.isLoading = true;
    const userId : String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/user/document/getuserdocuments/"+userId)
    .subscribe(
      (response)=>{
        response.forEach((element,index) => {
          element["SrNo"] = index+1;
        });
        this.documents.data = response;
        this.isLoading = false;
      },
      (error)=>{
        this.isLoading = false;
        this.toastr.error("Error Fetching Documents Details");
      }
    )
  }
}