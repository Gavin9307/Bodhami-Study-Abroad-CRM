import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
  }

  roles: string[] = ['ADMIN', 'COUNSELLOR'];

  councellorName: String = ""
  councellorEmail: String = ""
  councellorPhoneNumber: String = ""
  councellorDepartment: String = ""
  councellorPassword: String = ""
  councellorRole: String = "COUNSELLOR"
  councellorImage: String = ""
  councellorAddress: String = ""
  councellorStatus: String = "ACTIVE"

  isLoading: Boolean = false;
  addCouncellor() {
    this.isLoading = true;
    this.http.post("http://localhost:8080/api/councellor/addcouncellor", {
      councellorName: this.councellorName,
      councellorEmail: this.councellorEmail,
      councellorPhoneNumber: this.councellorPhoneNumber,
      councellorDepartment: this.councellorDepartment,
      councellorPassword: this.councellorPassword,
      councellorRole: this.councellorRole,
      councellorImage: this.councellorImage,
      councellorAddress: this.councellorAddress,
      councellorStatus: this.councellorStatus
    })
      .subscribe(
        (response) => {
          this.toastr.success("Councellor added successfully");
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Councellor cannot be added");
          this.isLoading = false;
        }
      )
  }
}
