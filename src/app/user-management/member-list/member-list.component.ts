import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamActionComponent } from '../team-action/team-action.component';

export interface CountryElement {
  teamName: string;
  teamLead: string;
  role: string;
}

const ELEMENT_DATA: CountryElement[] = [
  { teamName: 'super', teamLead: 'Langer' ,role: 'senior'},
  { teamName: 'USA', teamLead: 'Gavin', role: 'senior'},
  { teamName: 'All Star', teamLead: 'Jessica', role: 'senior' }
];

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
displayedColumns: string[] = ['teamName', 'teamLead', 'role', 'action'];
  dataSource = ELEMENT_DATA;

  constructor() {}
  ngOnInit() {
  }
}
