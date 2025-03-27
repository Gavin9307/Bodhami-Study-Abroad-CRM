import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  displayedColumns: string[] = ['country', 'university', 'course', 'email', 'location', 'website', 'action'];
  dataSource = [
    { country: 'UK', university: 'IFM University', course:'CS', email: 'ifmuniversity@gmail.com', location: 'Switzerland', website: 'https://www.ifm.ch' },
    { country: 'USA', university: 'IFM University', course:'Mechanical Engineering', email: 'ifmuniversity@gmail.com', location: 'Switzerland', website: 'https://www.ifm.ch' }
  ];

  constructor() { }

  ngOnInit() {
  }

  openDialog() {
    console.log('Action button clicked');
  }
}
