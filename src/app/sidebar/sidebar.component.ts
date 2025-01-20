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
  ];

  ngOnInit() {
  }

}
