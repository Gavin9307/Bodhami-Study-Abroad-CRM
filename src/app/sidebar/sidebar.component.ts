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
          link: '/home',
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
          name: 'Checklist Setup',
          link: '/study-abroad-setup/checklist-setup',
        },
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
        },
        {
          name: 'Document Type Setup',
          link: '/study-abroad-setup/document-type-setup',
        }
      ],
    },
    {
      title: 'Application Management',
      link: '/account',
      subItems: [
        {
          name: 'Application List',
          link: '/application-management/application-list',
        }
      ],
    }, {
      title: 'Student Abroad Analysis',
      link: '/home',
      subItems: [
        {
          name: 'Dashboard',
          link: '/study-abroad-analysis/study-abroad-analysis',
        }
      ]
    },
    {
      title: 'Student Management',
      link: '/home',
      subItems: [
        {
          name: 'Students List',
          link: '/student-management/student-list',
        }
      ]
    },
    {
      title: 'User Management',
      link: '/home',
      subItems: [
        {
          name: 'Teams',
          link: '/user-management/team-list',
        },
        {
          name: 'Councellors',
          link: '/user-management/member-list',
        }
      ]
    }
  ];

  ngOnInit() {
  }

}
