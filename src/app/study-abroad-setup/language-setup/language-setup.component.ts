import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'isDeleted'];
  dataSource = new MatTableDataSource<LanguageElement>([]);
  searchText: string = '';
  isLoading: boolean = false; // Added loader flag

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchLanguages();
  }

  fetchLanguages() {
    this.isLoading = true; // Show loader
    this.http.get<any[]>('http://localhost:8080/api/language/getAllLanguages')
      .subscribe(
        (data) => {
          this.dataSource.data = data.map(item => ({
            ...item,
            isDeleted: item.deleted // Correct mapping from API response
          }));
          this.dataSource.paginator = this.paginator;
          this.isLoading = false; // Hide loader
        },
        (error) => {
          console.error('Error fetching languages:', error);
          this.isLoading = false; // Hide loader on error
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  clearSearch() {
    this.searchText = '';
    this.dataSource.filter = '';
  }

  toggleDeleteStatus(element: LanguageElement) {
    const newStatus = !element.isDeleted;
    const url = newStatus
      ? `http://localhost:8080/api/language/deleteLanguage/${element.id}`
      : `http://localhost:8080/api/language/recoverLanguage/${element.id}`;

    this.isLoading = true; // Show loader
    this.http.put(url, {}).subscribe(
      () => {
        element.isDeleted = newStatus; // Update UI instantly
        this.isLoading = false; // Hide loader
      },
      (error) => {
        console.error('Error updating delete status:', error);
        this.isLoading = false; // Hide loader on error
      }
    );
  }
}
