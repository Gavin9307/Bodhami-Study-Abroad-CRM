import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  homeBannerData = [
    {
      title: 'Licenses Assigned',
      count: 25,
      icon: 'fas fa-clipboard',
      icon_color: '#3CB371'
    },
    {
      title: 'License Remaining',
      count: 18,
      icon: 'fas fa-clipboard-list',
      icon_color: '#3CB371'
    },
    {
      title: 'Total Students',
      count: 11800,
      icon: 'fas fa-chart-bar',
      icon_color: '#1E90FF'
    },
    {
      title: 'Applications Submitted',
      count: 32,
      icon: 'fas fa-trophy',
      icon_color: '#FFD700'
    },
    {
      title: 'Applications Processed',
      count: 18,
      icon: 'fas fa-question-circle',
      icon_color: '#6495ED'
    }
  ];

  ngOnInit() {
  }

}
