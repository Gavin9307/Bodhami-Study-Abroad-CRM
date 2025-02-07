import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CountryActionComponent } from '../country-action/country-action.component';

export interface CountryElement {
  checklistName: string;
  checklistHeading: string;
  checklistDescription: string;
}

const ELEMENT_DATA: CountryElement[] = [
  { checklistName: 'LOR', checklistHeading: 'IN', checklistDescription: 'This is a description that is a bit longer, it may take more than one line depending on the width of the table column. It should wrap properly without breaking the layout of the table.'},
  { checklistName: 'VISA', checklistHeading: 'US', checklistDescription: 'USD' },
  { checklistName: 'LOR', checklistHeading: 'DE', checklistDescription: 'EUR' }
];

@Component({
  selector: 'app-checklist-setup',
  templateUrl: './checklist-setup.component.html',
  styleUrls: ['./checklist-setup.component.css']
})
export class ChecklistSetupComponent implements OnInit {
 displayedColumns: string[] = ['checklistName', 'checklistHeading', 'checklistDescription','status','action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}
  
    openDialog(): void {
      this.dialog.open(CountryActionComponent, {
        width: '400px' 
      });
    }
  ngOnInit() {
  }

}
