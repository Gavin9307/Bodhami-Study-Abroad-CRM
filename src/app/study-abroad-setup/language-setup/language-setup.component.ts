import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LanguageElement {
  id: number;
  name: string;
  createdBy: number;
  updatedBy: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
}

@Component({
  selector: 'app-language-setup',
  templateUrl: './language-setup.component.html',
  styleUrls: ['./language-setup.component.css']
})
export class LanguageSetupComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt', 'isDeleted'];
  dataSource: LanguageElement[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchLanguages();
  }

  fetchLanguages() {
    this.http.get<LanguageElement[]>('http://localhost:8080/api/language/getAllLanguages')
      .subscribe(
        (data) => {
          this.dataSource = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching languages:', error);
        }
      );
  }
}
