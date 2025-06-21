import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UniversityActionComponent } from '../university-action/university-action.component';

@Component({
  selector: 'app-university-setup',
  templateUrl: './university-setup.component.html',
  styleUrls: ['./university-setup.component.css']
})
export class UniversitySetupComponent implements OnInit {
  displayedColumns: string[] = [
    'SrNo',
    'universityName',
    'universityEmail',
    'universityWebsite',
    'countryName',
    'isDeleted',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);
  isLoading = false;
  originalData: any[] = [];
  universityForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.universityForm = this.fb.group({
      universityName: [''],
      universityCode: [''],
      currency: ['']
    });
  }

  ngOnInit(): void {
    this.fetchUniversities();
  }

  fetchUniversities(): void {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:8080/api/university/getalluniversities').subscribe(
      (data) => {
        data.forEach((element, index) => {
          element['SrNo'] = index + 1;
        });
        console.log(data);
        this.originalData = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching Universities:', error);
        this.toastr.error('Failed to fetch universities');
        this.isLoading = false;
      }
    );
  }

  onSearch(event: Event): void {
    event.preventDefault(); // Prevent form submission from reloading the page
    const { universityName, universityCode, currency } = this.universityForm.value;

    const filteredData = this.originalData.filter((university) => {
      return (
        (universityName ? university.universityName.toLowerCase().includes(universityName.toLowerCase()) : true) &&
        (universityCode ? university.universityCode.toLowerCase().includes(universityCode.toLowerCase()) : true) &&
        (currency ? university.currency.toLowerCase().includes(currency.toLowerCase()) : true)
      );
    });

    this.dataSource.data = filteredData;
    this.dataSource.paginator = this.paginator; // Reset paginator after filtering
  }

  clearSearch(): void {
    this.universityForm.reset();
    this.dataSource.data = this.originalData; // Reset the data to show all universities
    this.dataSource.paginator = this.paginator;
  }

  toggleDeleteStatus(element: any): void {
    const universityId = element['universityId'];
    const action = element['isDeleted'] ? 'softrecover' : 'softdelete';
    const apiUrl = `http://localhost:8080/api/university/${action}/${universityId}`;

    this.isLoading = true;

    this.http.put(apiUrl, {}).subscribe(
      (response) => {
        const successMessage = element['isDeleted'] ? 'University Status Set to Active' : 'University Status Set to Inactive';
        this.toastr.success(successMessage);
        element['isDeleted'] = !element['isDeleted'];  // Toggle the status locally
        this.isLoading = false;
      },
      (error) => {
        const errorMessage = element['isDeleted'] ? 'Failed to Set University Status to Active' : 'Failed to Set University Status to Inactive';
        this.toastr.error(errorMessage);
        this.isLoading = false;
      }
    );
  }

  openDialog(element: any): void {
    const dialogRef: MatDialogRef<UniversityActionComponent> = this.dialog.open(UniversityActionComponent, {
          width: '400px',
          data: element
        });
      
        dialogRef.afterClosed().subscribe(() => {
          this.fetchUniversities();
        });
  }
}
