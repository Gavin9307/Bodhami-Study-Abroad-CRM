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
      title: 'Queries & Grievances',
      link: '/home', 
      subItems: [
        {
          name: 'Dashboard',
          link: '/abouta',
          }
      ]
    },
    {
      title: 'Billing & Cancellation',
      link: '/home', 
      subItems: [
        {
          name: 'Dashboard',
          link: '/abouta',
          }
      ]
    },
    {
      title: 'Reviews',
      link: '/home', 
      subItems: [
        {
          name: 'Review',
          link: '/Review/review',
          }
      ]
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
        },
        {
          name: 'University Setup',
          link: '/study-abroad-setup/university-setup',
        },
        {
          name: 'Language Setup',
          link: '/study-abroad-setup/language-setup',
        }
      ],
    },
    {
      title: 'Application Management',
      link: '/account', 
      subItems: [
        {
        name: 'Manage Student Application',
        link: '/application-management/manage-students-application',
        }
      ],
    },{
      title: 'Student Abroad Analysis',
      link: '/home', 
      subItems: [
        {
          name: 'Dashboard',
          link: '/abouta',
          }
      ]
    },
    {
      title: 'User Management',
      link: '/home', 
      subItems: [
        {
          name: 'Add Team',
          link: '/user-management/add-team',
          },
          {
            name: 'Add Member',
            link: '/abouta',
            },
            {
              name: 'Default',
              link: '/abouta',
              }  
      ]
    }
  ];

  ngOnInit() {
  }

}
