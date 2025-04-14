import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CountryActionComponent } from '../country-action/country-action.component';

export interface CountryElement {
  documentName: string;
  documentHeading: string;
  documentDescription: string;
}

const ELEMENT_DATA: CountryElement[] = [
  { documentName: 'LOR', documentHeading: 'IN', documentDescription: 'This is a description that is a bit longer, it may take more than one line depending on the width of the table column. It should wrap properly without breaking the layout of the table.'},
  { documentName: 'VISA', documentHeading: 'US', documentDescription: 'USD' },
  { documentName: 'LOR', documentHeading: 'DE', documentDescription: 'EUR' }
];

@Component({
  selector: 'app-document-setup',
  templateUrl: './document-setup.component.html',
  styleUrls: ['./document-setup.component.css']
})
export class DocumentSetupComponent implements OnInit {
 displayedColumns: string[] = ['documentName', 'documentHeading', 'documentDescription','action'];
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
