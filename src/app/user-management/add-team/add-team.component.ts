import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TeamActionComponent } from '../team-action/team-action.component';

export interface CountryElement {
  teamName: string;
  teamLead: string;
}

const ELEMENT_DATA: CountryElement[] = [
  { teamName: 'Team UK', teamLead: 'Samuel' },
  { teamName: 'Team US', teamLead: 'Langer'},
  { teamName: 'Team Uganda', teamLead: 'Patric' }
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
  
    openDialog(): void {
      this.dialog.open(TeamActionComponent, {
        width: '400px' 
      });
    }
  ngOnInit() {
  }

}
