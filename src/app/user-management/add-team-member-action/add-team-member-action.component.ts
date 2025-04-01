import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-team-member-action',
  templateUrl: './add-team-member-action.component.html',
  styleUrls: ['./add-team-member-action.component.css']
})
export class AddTeamMemberActionComponent implements OnInit {

  constructor(private router: Router, public dialogRef: MatDialogRef<AddTeamMemberActionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private toastr: ToastrService,private route: ActivatedRoute) { }

  isLoading: Boolean = false;
  positionList: any[] = [];
  selectedPosition = 0;

  ngOnInit() {
    console.log(this.data);
    this.getPositionDropDown();
  }
  onButton1Click(): void {
    console.log('Button 1 clicked');
    this.router.navigate(['/user-management/team-list/add-member/' + this.data.teamId]);
    this.dialogRef.close();
  }

  getPositionDropDown() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/team/getallteamcouncellorposition")
      .subscribe(
        (response) => {
          this.positionList = response;
          this.selectedPosition = this.data["positionId"]
          this.isLoading = false;
        },
        (error) => {
          // console.log("Error Fetching Teams. Reason : " + error.message);
          this.isLoading = false;
          this.toastr.error("Some Error Occured");
        }
      )
  }

  onUpdatePosition() {
    this.isLoading = true;
    const teamId: String = this.route.snapshot.paramMap.get('id');
    this.http.put<any[]>("http://localhost:8080/api/team/updateteamcouncellorposition", {
        teamCouncellorId : this.data["teamCouncellorId"],
        positionId : this.selectedPosition
    })
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success("Position Updated Successfully");
        },
        (error) => {
          // console.log("Error Fetching Teams. Reason : " + error.message);
          this.isLoading = false;
          this.toastr.error("Error Updating Position");
        }
      )
  }
}
