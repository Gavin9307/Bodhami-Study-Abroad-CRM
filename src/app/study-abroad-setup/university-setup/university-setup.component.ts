import { Component, OnInit } from '@angular/core';

export interface CourseElement {
  Name: string;
  Website: string;
  NationalRanking: number;
  StateRanking: number;
  Address: string;
  YearofEstablishment: number;
}

const ELEMENT_DATA: CourseElement[] = [
  { Name: 'iFM UNI', Website: 'https://www.ifmuni.edu', NationalRanking: 100, StateRanking: 100, Address: 'Goa, India', YearofEstablishment: 1999 },
  { Name: 'AI University', Website: 'https://www.aiuni.edu', NationalRanking: 1, StateRanking: 1, Address: 'Maharashtara, India', YearofEstablishment: 1986 }
];

@Component({
  selector: 'app-university-setup',
  templateUrl: './university-setup.component.html',
  styleUrls: ['./university-setup.component.css']
})
export class UniversitySetupComponent implements OnInit {
  // Add 'broche' to the displayed columns to include the "Broche" column in the table
  displayedColumns: string[] = ['Name', 'Website', 'NationalRanking', 'StateRanking', 'Address', 'YearofEstablishment', 'BrocheLink'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void { }

  downloadFile() {
    const link = document.createElement('a');
    link.href = 'assets/myfile.pdf';  // Path to your file in the assets folder
    link.download = 'myfile.pdf';  // File name for the download
    link.click();
  }
}
