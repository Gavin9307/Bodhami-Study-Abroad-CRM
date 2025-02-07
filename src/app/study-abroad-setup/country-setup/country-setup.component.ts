import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CountryActionComponent } from '../country-action/country-action.component';

export interface CountryElement {
  countryName: string;
  countryCode: string;
  currency: string;
}

const ELEMENT_DATA: CountryElement[] = [
  { countryName: 'India', countryCode: 'IN', currency: 'INR'},
  { countryName: 'United States', countryCode: 'US', currency: 'USD' },
  { countryName: 'Germany', countryCode: 'DE', currency: 'EUR' }
];

@Component({
  selector: 'app-country-setup',
  templateUrl: './country-setup.component.html',
  styleUrls: ['./country-setup.component.css']
})
export class CountrySetupComponent implements OnInit {
  displayedColumns: string[] = ['countryName', 'countryCode', 'currency','status','action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}
  
    openDialog(): void {
      this.dialog.open(CountryActionComponent, {
        width: '400px' 
      });
    }

  ngOnInit() {}
}
