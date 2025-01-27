import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  sidebarData = [
    {
      title: 'Home',
      link: '/home', 
      subItems: [
        {
          name: 'Dashboard',
          link: '/abouta',
          }
      ]
    },
    {
      title: 'About',
      link: '/about', 
      subItems: [
        {
        name: 'Aboutd',
        link: '/abouta',
        },
        {
          name: 'About',
        link: '/abouts',
        }
      ],
    },
    {
      title: 'Account',
      link: '/account', 
      subItems: [
        {
        name: 'Profile Update',
        link: '/account/profile-update',
        }
      ],
    },
    {
      title: 'Study Abroad Setup',
      link: '/account', 
      subItems: [
        {
        name: 'Country Setup',
        link: '/study-abroad-setup/country-setup',
        },
        {
          name: 'Course Setup',
          link: '/study-abroad-setup/course-setup',
        }
      ],
    }
  ];

  ngOnInit() {
  }

}
