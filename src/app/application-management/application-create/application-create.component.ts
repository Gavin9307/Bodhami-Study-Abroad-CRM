import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatStepper, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('addressesPaginator') addressesPaginator!: MatPaginator;
  @ViewChild('medicalsPaginator') medicalsPaginator!: MatPaginator;
  @ViewChild('guardiansPaginator') guardiansPaginator!: MatPaginator;
  @ViewChild('experiencesPaginator') experiencesPaginator!: MatPaginator;
  @ViewChild('educationsPaginator') educationsPaginator!: MatPaginator;
  @ViewChild('optionalCoursesPaginator') optionalCoursesPaginator!: MatPaginator;
  @ViewChild('coursesPaginator') coursesPaginator!: MatPaginator;

  applicationUserForm: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    teamId: new FormControl('', Validators.required)
  });

  applicationBasicDetails: FormGroup = new FormGroup({
    firstName: new FormControl('sc', Validators.required),
    middleName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required)
  });

  applicationAddressDetails: FormGroup = new FormGroup({
    country: new FormControl('', Validators.required),
    pinCode: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    streetAddress: new FormControl('', Validators.required),
    landmark: new FormControl('', Validators.required)

  });

  applicationEducationDetails: FormGroup = new FormGroup({
    school: new FormControl('', Validators.required),
    educationLevel: new FormControl('', Validators.required),
    fieldOfStudy: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  });

  applicationExperienceDetails: FormGroup = new FormGroup({
    totalExperience: new FormControl('', Validators.required),
    currentProficiency: new FormControl('', Validators.required),
    currentDesignation: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    currentProfessionalSubarea: new FormControl('', Validators.required)
  });

  applicationGuardianDetails: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  applicationMedicalDetails: FormGroup = new FormGroup({
    medicalIssue: new FormControl('', Validators.required),
    hasDisability: new FormControl('', Validators.required)

  });

  applicationOptionalCourseDetails: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    certificate: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required)
  });

  applicationCourses: FormGroup = new FormGroup({
    courseId: new FormControl('', Validators.required),
    countryId: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required)
  });

  secondFormGroup: FormGroup = new FormGroup({});
  isLinear = true;
  isLoading: Boolean = false;

  userList: any[] = [];
  teamList: any[] = [];
  countryList: any[] = [];
  courseList: any[] = [];
  universityList: any[] = [];


  selectedCourses: any[] = [];

  addresses = new MatTableDataSource<any>([]);
  addressesDisplayedColumns: String[] = ["SrNo", "country", "state", "city", "streetAddress", "landmark", "pinCode", "action"];

  medicals = new MatTableDataSource<any>([]);
  medicalsDisplayedColumns: String[] = ["SrNo", "medicalIssue", "hasDisability", "action"];

  guardians = new MatTableDataSource<any>([]);
  guardiansDisplayedColumns: String[] = ["SrNo", "firstName", "middleName", "lastName", "phoneNumber", "email", "action"];

  experiences = new MatTableDataSource<any>([]);
  experiencesDisplayedColumns: String[] = ["SrNo", "title", "company", "startDate", "endDate", "action"];

  educations = new MatTableDataSource<any>([]);
  educationsDisplayedColumns: String[] = ["SrNo", "school", "educationLevel", "startDate", "endDate", "action"];

  optionalCourses = new MatTableDataSource<any>([]);
  optionalCoursesDisplayedColumns: String[] = ["SrNo", "title", "certificate", "level", "startDate", "endDate", "action"];

  applicationSelectedCourses = new MatTableDataSource<any>([]);
  applicationSelectedCoursesDisplayedColumns: String[] = ["SrNo", "Course", "University", "Country", "action"];


  constructor(private http: HttpClient, private toastr: ToastrService,private router: Router) { }

  // onStepChange(event: StepperSelectionEvent): void {
  //   if (event.selectedIndex === 1) {

  //   }
  // }

  onStudentSelected(userId: number): void {
    this.getUserBasicDetails();
    this.getUserAddresses();
    this.getUserEducations();
    this.getUserExperiences();
    this.getUserGuardians();
    this.getUserOptionalCourses();
    this.getUserMedicals();
    this.getCountries();
  }


  ngOnInit() {
    this.getUsers();
    this.getTeams();
  }

  ngAfterViewInit() {
    this.addresses.paginator = this.addressesPaginator;
    this.medicals.paginator = this.medicalsPaginator;
    this.guardians.paginator = this.guardiansPaginator;
    this.experiences.paginator = this.experiencesPaginator;
    this.educations.paginator = this.educationsPaginator;
    this.optionalCourses.paginator = this.optionalCoursesPaginator;
  }

  removeAddressElement(index: number): void {
    const currentData = this.addresses.data;
    currentData.splice(index, 1);
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.addresses.data = currentData;
  }

  removeEducationElement(index: number): void {
    const currentData = this.educations.data;
    currentData.splice(index, 1);
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.educations.data = currentData;
  }

  removeExperienceElement(index: number): void {
    const currentData = this.experiences.data;
    currentData.splice(index, 1);
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.experiences.data = currentData;
  }

  removeGuardianElement(index: number): void {
    const currentData = this.guardians.data;
    currentData.splice(index, 1);
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.guardians.data = currentData;
  }

  removeMedicalElement(index: number): void {
    const currentData = this.medicals.data;
    currentData.splice(index, 1);
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.medicals.data = currentData;
  }

  removeOptionalCourseElement(index: number): void {
    const currentData = this.optionalCourses.data;
    currentData.splice(index, 1);
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.optionalCourses.data = currentData;
  }

  removeCourse(index: number): void {
    const currentData = this.applicationSelectedCourses.data;
    currentData.splice(index, 1);
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.applicationSelectedCourses.data = currentData;
  }

  getUsers() {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:8080/api/user/getalluserlist')
      .subscribe(
        (response) => {
          this.userList = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching Students");
          this.isLoading = false;
        }
      );
  }

  getTeams() {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:8080/api/team/getallteams')
      .subscribe(
        (response) => {
          this.teamList = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error fetching Teams");
          this.isLoading = false;
        }
      );
  }

  getUserBasicDetails() {
    this.isLoading = true;

    const userId = this.applicationUserForm.controls['userId'].value;

    this.http.get<any>(`http://localhost:8080/api/user/basicdetails/getSingleUserBasicDetails/${userId}`)
      .subscribe(
        (response) => {
          this.applicationBasicDetails.patchValue({
            firstName: response.firstName,
            middleName: response.middleName,
            lastName: response.lastName,
            dateOfBirth: new Date(response.dateOfBirth)
          });
        },
        (error) => {
          this.toastr.error("Error Fetching Student Basic details");
        }
      );
  }

  getUserAddresses() {
    this.isLoading = true;

    const userId = this.applicationUserForm.controls['userId'].value;

    this.http.get<any[]>(`http://localhost:8080/api/user/address/getuseraddresses/${userId}`)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.addresses.data = response;
        },
        (error) => {
          this.toastr.error("Error Fetching Addresses");
        }
      );
  }

  addUserAddress() {

    const address = {
      country: this.applicationAddressDetails.controls['country'].value,
      pinCode: this.applicationAddressDetails.controls['pinCode'].value,
      state: this.applicationAddressDetails.controls['state'].value,
      city: this.applicationAddressDetails.controls['city'].value,
      streetAddress: this.applicationAddressDetails.controls['streetAddress'].value,
      landmark: this.applicationAddressDetails.controls['landmark'].value
    };

    this.addresses.data.push(address);
    const currentData = this.addresses.data;
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.addresses.data = currentData;
  }

  getUserEducations() {

    const userId = this.applicationUserForm.controls['userId'].value;

    this.http.get<any[]>(`http://localhost:8080/api/user/education/getallusereducation/${userId}`)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
            element["startDate"] = new Date(element["startDate"]);
            element["endDate"] = new Date(element["endDate"]);
          });
          this.educations.data = response;
        },
        (error) => {
          this.toastr.error("Error Fetching Educations");
        }
      );
  }

  addUserEducation() {

    const education = {
      school: this.applicationAddressDetails.controls['school'].value,
      educationLevel: this.applicationAddressDetails.controls['educationLevel'].value,
      fieldOfStudy:this.applicationAddressDetails.controls['fieldOfStudy'].value,
      country: this.applicationAddressDetails.controls['country'].value,
      state: this.applicationAddressDetails.controls['state'].value,
      city: this.applicationAddressDetails.controls['city'].value,
      startDate: this.applicationAddressDetails.controls['startDate'].value,
      endDate: this.applicationAddressDetails.controls['endDate'].value
    };

    this.educations.data.push(education);
    const currentData = this.educations.data;
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.educations.data = currentData;
  }

  getUserExperiences() {

    const userId = this.applicationUserForm.controls['userId'].value;

    this.http.get<any[]>(`http://localhost:8080/api/user/experience/getuserexperiences/${userId}`)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
            element["startDate"] = new Date(element["startDate"]);
            element["endDate"] = new Date(element["endDate"]);
          });
          this.experiences.data = response;
        },
        (error) => {
          this.toastr.error("Error Fetching Experiences");
        }
      );
  }

  addUserExperience() {

    const address = {
      country: this.applicationAddressDetails.controls['country'].value,
      pinCode: this.applicationAddressDetails.controls['pinCode'].value,
      state: this.applicationAddressDetails.controls['state'].value,
      city: this.applicationAddressDetails.controls['city'].value,
      streetAddress: this.applicationAddressDetails.controls['streetAddress'].value,
      landmark: this.applicationAddressDetails.controls['landmark'].value
    };

    this.experiences.data.push(address);
    const currentData = this.experiences.data;
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.experiences.data = currentData;
  }

  getUserOptionalCourses() {
    this.isLoading = true;

    const userId = this.applicationUserForm.controls['userId'].value;

    this.http.get<any[]>(`http://localhost:8080/api/user/optionalcourse/getalluseroptionalcourses/${userId}`)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
            element["startDate"] = new Date(element["startDate"]);
            element["endDate"] = new Date(element["endDate"]);
          });
          this.optionalCourses.data = response;
        },
        (error) => {
          this.toastr.error("Error Fetching Optional Courses");
        }
      );
  }

  addUserOptionalCourse() {

    const address = {
      country: this.applicationAddressDetails.controls['country'].value,
      pinCode: this.applicationAddressDetails.controls['pinCode'].value,
      state: this.applicationAddressDetails.controls['state'].value,
      city: this.applicationAddressDetails.controls['city'].value,
      streetAddress: this.applicationAddressDetails.controls['streetAddress'].value,
      landmark: this.applicationAddressDetails.controls['landmark'].value
    };

    this.optionalCourses.data.push(address);
    const currentData = this.optionalCourses.data;
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.optionalCourses.data = currentData;
  }

  getUserGuardians() {
    this.isLoading = true;

    const userId = this.applicationUserForm.controls['userId'].value;

    this.http.get<any[]>(`http://localhost:8080/api/user/guardian/getuserguardians/${userId}`)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.guardians.data = response;
        },
        (error) => {
          this.toastr.error("Error Fetching Guardians");
        }
      );
  }

  addUserGuardian() {

    const address = {
      country: this.applicationAddressDetails.controls['country'].value,
      pinCode: this.applicationAddressDetails.controls['pinCode'].value,
      state: this.applicationAddressDetails.controls['state'].value,
      city: this.applicationAddressDetails.controls['city'].value,
      streetAddress: this.applicationAddressDetails.controls['streetAddress'].value,
      landmark: this.applicationAddressDetails.controls['landmark'].value
    };

    this.guardians.data.push(address);
    const currentData = this.guardians.data;
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.guardians.data = currentData;
  }

  getUserMedicals() {
    this.isLoading = true;
    const userId = this.applicationUserForm.controls['userId'].value;

    this.http.get<any[]>(`http://localhost:8080/api/user/medical/getusermedicals/${userId}`)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.medicals.data = response;
        },
        (error) => {
          this.toastr.error("Error Fetching Medical Details");
        }
      );
  }

  addUserMedical() {

    const address = {
      country: this.applicationAddressDetails.controls['country'].value,
      pinCode: this.applicationAddressDetails.controls['pinCode'].value,
      state: this.applicationAddressDetails.controls['state'].value,
      city: this.applicationAddressDetails.controls['city'].value,
      streetAddress: this.applicationAddressDetails.controls['streetAddress'].value,
      landmark: this.applicationAddressDetails.controls['landmark'].value
    };

    this.medicals.data.push(address);
    const currentData = this.medicals.data;
    currentData.forEach((el, i) => el.SrNo = i + 1);
    this.medicals.data = currentData;
  }

  getCountries() {
    this.isLoading = true;

    this.http.get<any[]>(`http://localhost:8080/api/country/getallcountries`)
      .subscribe(
        (response) => {
          this.countryList = response;
          this.courseList = [];
          this.universityList = [];
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error loading Countries dropdown");
          this.isLoading = false;
        }
      );

  }

  onCountryChange(event: any) {
    const selectedCountryId = event.value;
    this.getUniversities(selectedCountryId);
  }

  getUniversities(countryId: Number) {
    this.isLoading = true;

    this.http.get<any[]>(`http://localhost:8080/api/university/getalluniversities`)
      .subscribe(
        (response) => {
          this.universityList = response;
          this.universityList = this.universityList.filter((university) => {
            return university.countryId == countryId;
          });
          this.courseList = [];
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error loading University dropdown");
          this.isLoading = false;
        }
      );
  }

  onUniversityChange(event: any) {
    const selectedUniversityId = event.value;
    this.getCourses(selectedUniversityId);
  }

  getCourses(universityId: Number) {
    this.isLoading = true;

    this.http.get<any[]>(`http://localhost:8080/api/course/getallcourses`)
      .subscribe(
        (response) => {
          this.courseList = response;
          this.courseList = this.courseList.filter((course) => {
            return course.universityId == universityId;
          });
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error loading Courses dropdown");
          this.isLoading = false;
        }
      );
  }

  addCourse() {
    if (this.applicationCourses.controls['courseId'].value &&
      this.applicationCourses.controls['countryId'].value &&
      this.applicationCourses.controls['universityId'].value) {

      const courseId = +this.applicationCourses.controls['courseId'].value;
      const countryId = +this.applicationCourses.controls['countryId'].value;
      const universityId = +this.applicationCourses.controls['universityId'].value;



      const isDuplicate = this.applicationSelectedCourses.data.some(course =>
        course.courseId === courseId &&
        course.countryId === countryId &&
        course.universityId === universityId
      );

      if (isDuplicate) {
        this.toastr.warning('This course is already added.');
        return;
      }
      else {
        const courseName = this.courseList.find(course => course["courseId"] === courseId)["courseName"];
        const countryName = this.countryList.find(country => country["countryId"] === countryId)["countryName"];
        const universityName = this.universityList.find(university => university["universityId"] === universityId)["universityName"];

        this.applicationSelectedCourses.data.push({
          courseId,
          countryId,
          universityId,
          courseName,
          countryName,
          universityName
        });

        this.applicationSelectedCourses._updateChangeSubscription();

        this.applicationSelectedCourses.data.forEach((element, index) => {
          element["SrNo"] = index + 1;
        });

        console.log(this.applicationSelectedCourses.data);
        this.applicationCourses.reset();
        this.countryList.length = 0;
        this.courseList.length = 0;
        this.universityList.length = 0;
        this.getCountries();
      }

    } else {
      this.toastr.error('Please select all fields.');
    }
  }

  saveApplication() {
    this.isLoading = true;
    const payload = {
      userId: this.applicationUserForm.controls['userId'].value,
      teamId: this.applicationUserForm.controls['teamId'].value,
      status: 'in-progress',
      isDeleted: false,
      firstName: this.applicationBasicDetails.controls['firstName'].value,
      middleName: this.applicationBasicDetails.controls['middleName'].value,
      lastName: this.applicationBasicDetails.controls['lastName'].value,
      dateOfBirth: this.applicationBasicDetails.controls['dateOfBirth'].value,

      addresses: this.addresses.data,
      educations: this.educations.data,
      experiences: this.experiences.data,
      guardians: this.guardians.data,
      medicals: this.medicals.data,
      optionalCourses: this.optionalCourses.data,
      courseUniversityCountryIds: this.applicationSelectedCourses.data
    }
    this.http.post<any>(`http://localhost:8080/api/application/createapplication`, payload)
      .subscribe(
        (response) => {
          this.router.navigate(['/application-management/application-view', response.applicationId]);
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Saving Application");
          this.isLoading = false;
        }
      );
  }
}
