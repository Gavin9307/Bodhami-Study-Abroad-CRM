import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {
  isLinear = false;
  basicDetails: any;
  addressDetails: any;
  educationDetails: any;
  experienceDetails: any;
  languageAndCertificationDetails: any;
  competencyAndAchievementsDetails: any;

  constructor() {}

  ngOnInit() {
    this.basicDetails = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      expectedSalary: '50000',
      dateOfJoining: '2021-01-01',
      onlineProfileLink: 'https://example.com/johndoe'
    };

    this.addressDetails = {
      country: 'India',
      postalCode: '403601',
      state: 'Andhra Pradesh',
      city: 'Goa',
      streetAddress: 'cccccccccccccccccccccccc'
    };

    this.educationDetails = {
      levelOfEducation: 'Class 8',
      fieldOfStudy: 'ZZZZZZ',
      schoolName: 'Example School',
      country: 'India',
      state: 'Andhra Pradesh',
      city: 'Goa',
      academicStartYear: '2005',
      academicEndYear: '2009'
    };

    this.experienceDetails = {
      totalExperience: 'Fresher'
    };

    this.languageAndCertificationDetails = {
      languages: ['English', 'Assamese'],
      certifications: [
        { name: 'Certification 1', startYear: '2010', endYear: '2012' },
        { name: 'Certification 2', startYear: '2013', endYear: '2015' }
      ]
    };

    this.competencyAndAchievementsDetails = {
      competencies: ['Sales Closure', 'HTML'],
      achievements: [
        { title: 'Award 1', awardedYear: '2018', description: 'Description 1' },
        { title: 'Award 2', awardedYear: '2019', description: 'Description 2' }
      ]
    };
  }
}