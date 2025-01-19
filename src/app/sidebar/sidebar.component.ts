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
      link: '/home', // Direct link
      subItems: [], // No subitems
    },
    {
      title: 'About',
      link: '/about', // Direct link
      subItems: [], // No subitems
    },
  ];

  ngOnInit() {
  }

}
