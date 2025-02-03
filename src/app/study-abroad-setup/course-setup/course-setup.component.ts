import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface CourseElement {
  courseName: string;
  university: string;
  duration: number;
  level: string;
  areaOfStudy: string;
  price: number;
}

const ELEMENT_DATA: CourseElement[] = [
  { courseName: 'Software Development', university: 'UCT', duration: 1, level: 'Master', areaOfStudy: 'AI', price: 8000 },
  { courseName: 'AI', university: 'GU', duration: 1, level: 'Master', areaOfStudy: 'Data Science', price: 9000 }
];

@Component({
  selector: 'app-course-setup',
  templateUrl: './course-setup.component.html',
  styleUrls: ['./course-setup.component.css']
})
export class CourseSetupComponent implements OnInit {
  displayedColumns: string[] = ['courseName', 'university', 'duration', 'level', 'areaOfStudy', 'price'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit() {}
}
