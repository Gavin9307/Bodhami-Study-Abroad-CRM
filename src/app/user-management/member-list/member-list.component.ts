import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamActionComponent } from '../team-action/team-action.component';

export interface CountryElement {
  teamName: string;
  teamLead: string;
  role: string;
}

const ELEMENT_DATA: CountryElement[] = [
  { teamName: 'LOR', teamLead: 'IN' ,role: 'senior'},
  { teamName: 'VISA', teamLead: 'US', role: 'senior'},
  { teamName: 'LOR', teamLead: 'DE', role: 'senior' }
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
