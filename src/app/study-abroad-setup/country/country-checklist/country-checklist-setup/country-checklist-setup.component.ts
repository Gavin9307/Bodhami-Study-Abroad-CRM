import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from '@angular/core/src/render3/instructions';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-country-checklist-setup',
  templateUrl: './country-checklist-setup.component.html',
  styleUrls: ['./country-checklist-setup.component.css']
})
export class CountryChecklistSetupComponent implements OnInit {

  countryChecklists = new MatTableDataSource<any>([]);
  selectedChecklist = 0;
  country: Object = {};
  countryChecklistDropdown: any[];
  displayedColumns: String[] = ["SrNo", "checklistName", "checklistDescription", "isRequired", "deleteChecklist"]

  isLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private toastr: ToastrService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.getAllCountryChecklists();
    this.getCountryChecklistDropDown();
    this.getCountry();
  }

  ngAfterViewInit() {
    this.countryChecklists.paginator = this.paginator;
  }

  getAllCountryChecklists() {
    this.isLoading = true;
    const countryId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/country/getcountrychecklists/" + countryId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.countryChecklists.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Country Checklists");
        }
      )
  }

  onIsRequiredChange(element: any[]) {

    const isRequired: Boolean = element["isRequired"];
    const checklistMappingId: Number = element["checklistMappingId"];

    this.isLoading = true;
    this.http.put("http://localhost:8080/api/country/updatecountrychecklistrequired", {
      isRequired:isRequired,
      checklistMappingId:checklistMappingId
    })
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success("Required Status Updated Successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Failed To Update Required Status");
          this.isLoading = false;
        }
      );
  }

  getCountryChecklistDropDown() {
    this.isLoading = true;
    const countryId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/country/getcountrychecklistsdropdown/" + countryId)
      .subscribe(
        (response) => {
          this.countryChecklistDropdown = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Checklists Dropdown");
        }
      )
  }

  addCountryChecklist() {
    this.isLoading = true;
    const countryId: String = this.route.snapshot.paramMap.get('id');

    this.http.post<any[]>("http://localhost:8080/api/country/addcountrychecklist", {
      checklistId: this.selectedChecklist,
      countryId: countryId,
      isRequired: true
    })
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getAllCountryChecklists();
          this.getCountryChecklistDropDown();
          this.selectedChecklist = 0;
          this.toastr.success("Checklist added to Country");
        },
        (error) => {
          this.isLoading = false;
          this.selectedChecklist = 0;
          this.toastr.error("Error Adding Checklist to Country");
        }
      )
  }

  removeCountryChecklistBtn(checklistCountryMappingId: String) {
    this.isLoading = true;
    this.http.delete("http://localhost:8080/api/country/removecountrychecklist/" + checklistCountryMappingId)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getAllCountryChecklists();
          this.getCountryChecklistDropDown();
          this.selectedChecklist = 0;
          this.toastr.success("Checklist Removed Successfully");
        },
        (error) => {
          this.isLoading = false;
          this.selectedChecklist = 0;
          this.toastr.error("Error Removing Checklist");
        }
      )
  }

  getCountry() {
    this.isLoading = true;
    const countryId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`http://localhost:8080/api/country/getsinglecountry/${countryId}`)
      .subscribe(
        (response) => {
          this.country = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching Country");
          this.isLoading = false;
        }
      );
  }
}