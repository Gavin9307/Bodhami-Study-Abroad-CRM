import { Component, OnInit } from '@angular/core';

export interface CourseElement {
  UniversityName: string;
  website: string;
  rating: number;
  level: string;
  areaOfStudy: string;
  exam: string;
}

const ELEMENT_DATA: CourseElement[] = [
  { UniversityName: 'iFM UNI', website: 'https://www.ifmuni.edu', rating: 100, level: 'Master', areaOfStudy: 'AI', exam: 'ABC' },
  { UniversityName: 'AI University', website: 'https://www.aiuni.edu', rating: 1, level: 'Master', areaOfStudy: 'Data Science', exam: 'ss' }
];

@Component({
  selector: 'app-university-setup',
  templateUrl: './university-setup.component.html',
  styleUrls: ['./university-setup.component.css']
})
export class UniversitySetupComponent implements OnInit {
  // Add 'broche' to the displayed columns to include the "Broche" column in the table
  displayedColumns: string[] = ['UniversityName', 'website', 'rating', 'level', 'areaOfStudy', 'exam', 'broche'];
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
