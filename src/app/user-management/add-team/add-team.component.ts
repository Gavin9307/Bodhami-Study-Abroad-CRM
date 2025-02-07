import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface CountryElement {
  teamName: string;
  teamLead: string;
}

const ELEMENT_DATA: CountryElement[] = [
  { teamName: 'LOR', teamLead: 'IN' },
  { teamName: 'VISA', teamLead: 'US'},
  { teamName: 'LOR', teamLead: 'DE' }
];


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
 displayedColumns: string[] = ['teamName', 'teamLead','action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}
  
    // openDialog(): void {
    //   this.dialog.open(CountryActionComponent, {
    //     width: '400px' 
    //   });
    // }
  ngOnInit() {
  }

}
