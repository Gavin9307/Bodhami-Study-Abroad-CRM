import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LanguageService, LanguageElement } from '../../services/language/language.service';

@Component({
  selector: 'app-language-setup',
  templateUrl: './language-setup.component.html',
  styleUrls: ['./language-setup.component.css']
})
export class LanguageSetupComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'isDeleted'];
  dataSource = new MatTableDataSource<LanguageElement>([]);
  searchText: string = '';
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.fetchLanguages();
  }

  fetchLanguages() {
    this.isLoading = true;
    this.languageService.getLanguages().subscribe(
      (data) => {
        this.dataSource.data = data.map(item => ({
          ...item,
          isDeleted: item.deleted
        }));
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching languages:', error);
        this.languageService.showErrorMessage('Failed to load languages');
        this.isLoading = false;
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
    this.isLoading = true;
    this.languageService.toggleDeleteStatus(element.id, element.deleted).subscribe(
      () => {
        element.deleted = !element.deleted; // Instantly update UI
        const message = element.deleted ? 'Language deleted successfully!' : 'Language recovered successfully!';
        this.languageService.showSuccessMessage(message);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error updating delete status:', error);
        this.languageService.showErrorMessage('Failed to update delete status');
        this.isLoading = false;
      }
    );
  }
}
