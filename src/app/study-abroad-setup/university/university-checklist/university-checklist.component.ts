import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from '@angular/core/src/render3/instructions';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-university-checklist',
  templateUrl: './university-checklist.component.html',
  styleUrls: ['./university-checklist.component.css']
})
export class UniversityChecklistComponent implements OnInit {

  universityChecklists = new MatTableDataSource<any>([]);
  selectedChecklist = 0;
  university: Object = {};
  universityChecklistDropdown: any[];
  displayedColumns: String[] = ["SrNo", "checklistName", "checklistDescription", "isRequired", "deleteChecklist"]

  isLoading: Boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private toastr: ToastrService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.getAllUniversityChecklists();
    this.getUniversityChecklistDropDown();
    this.getUniversity();
  }

  ngAfterViewInit() {
    this.universityChecklists.paginator = this.paginator;
  }

  getAllUniversityChecklists() {
    this.isLoading = true;
    const universityId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/university/getuniversitychecklists/" + universityId)
      .subscribe(
        (response) => {
          response.forEach((element, index) => {
            element["SrNo"] = index + 1;
          });
          this.universityChecklists.data = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching University Checklists");
        }
      )
  }

  onIsRequiredChange(element: any[]) {

    const isRequired: Boolean = element["isRequired"];
    const checklistMappingId: Number = element["checklistMappingId"];

    this.isLoading = true;
    this.http.put("http://localhost:8080/api/university/updateuniversitychecklistrequired", {
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

  getUniversityChecklistDropDown() {
    this.isLoading = true;
    const universityId: String = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>("http://localhost:8080/api/university/getuniversitychecklistsdropdown/" + universityId)
      .subscribe(
        (response) => {
          this.universityChecklistDropdown = response;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching Checklists Dropdown");
        }
      )
  }

  addUniversityChecklist() {
    this.isLoading = true;
    const universityId: String = this.route.snapshot.paramMap.get('id');

    this.http.post<any[]>("http://localhost:8080/api/university/adduniversitychecklist", {
      checklistId: this.selectedChecklist,
      universityId: universityId,
      isRequired: true
    })
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getAllUniversityChecklists();
          this.getUniversityChecklistDropDown();
          this.selectedChecklist = 0;
          this.toastr.success("Checklist added to University");
        },
        (error) => {
          this.isLoading = false;
          this.selectedChecklist = 0;
          this.toastr.error("Error Adding Checklist to University");
        }
      )
  }

  removeUniversityChecklistBtn(checklistUniversityMappingId: String) {
    this.isLoading = true;
    this.http.delete("http://localhost:8080/api/university/removeuniversitychecklist/" + checklistUniversityMappingId)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.getAllUniversityChecklists();
          this.getUniversityChecklistDropDown();
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

  getUniversity() {
    this.isLoading = true;
    const universityId: string = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`http://localhost:8080/api/university/getsingleuniversity/${universityId}`)
      .subscribe(
        (response) => {
          this.university = response;
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Error Fetching University");
          this.isLoading = false;
        }
      );
  }
}
