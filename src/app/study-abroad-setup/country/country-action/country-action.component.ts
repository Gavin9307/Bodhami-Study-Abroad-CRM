import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country-action',
  templateUrl: './country-action.component.html',
  styleUrls: ['./country-action.component.css']
})
export class CountryActionComponent implements OnInit {
  constructor(private toastr : ToastrService,private http: HttpClient,private router: Router, public dialogRef: MatDialogRef<CountryActionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() {
  }

  isLoading : Boolean  = false;

  onChecklistButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/country-setup/country-checklist-setup/'+this.data.countryId]);
    this.dialogRef.close();
  }

  onEditButtonClick(): void {
    this.router.navigate(['/study-abroad-setup/country-setup/edit-country/'+this.data.countryId]);
    this.dialogRef.close(); 
  }

  onDeleteButtonClick(): void {
    this.isLoading = true;
    this.http.delete('http://localhost:8080/api/country/delete/'+this.data.countryId).subscribe(
      (response) => {
        this.toastr.success('Country deleted successfully');
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Error deleting country');
        this.isLoading = false;
      }
    );
    this.dialogRef.close();
  }

}
