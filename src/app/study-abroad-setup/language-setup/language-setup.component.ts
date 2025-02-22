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
    this.http.get<any[]>('http://localhost:8080/api/language/getAllLanguages')
      .subscribe(
        (data) => {
          this.dataSource = data.map(item => ({
            ...item,
            isDeleted: item.deleted // Correct mapping from API response
          }));
          console.log(this.dataSource);
        },
        (error) => {
          console.error('Error fetching languages:', error);
        }
      );
  }
  
  toggleDeleteStatus(element: LanguageElement) {
    const newStatus = !element.isDeleted;
    const url = newStatus
      ? `http://localhost:8080/api/language/deleteLanguage/${element.id}`
      : `http://localhost:8080/api/language/recoverLanguage/${element.id}`;

    this.http.put(url, {}).subscribe(
      () => {
        element.isDeleted = newStatus; // Immediate UI update
      },
      (error) => {
        console.error('Error updating delete status:', error);
      }
    );
  }
}
