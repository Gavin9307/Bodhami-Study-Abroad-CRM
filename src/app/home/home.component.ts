import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http : HttpClient, private toastr : ToastrService) { }


  students: any = [];
  applications: any = [];
  isLoading: boolean = false;

  homeBannerData = [
    {
      title: 'Licenses Assigned',
      count: 25,
      icon: 'fas fa-clipboard',
      icon_color: '#3CB371'
    },
    {
      title: 'License Remaining',
      count: 18,
      icon: 'fas fa-clipboard-list',
      icon_color: '#3CB371'
    },
    {
      title: 'Total Students',
      count: '',
      icon: 'fas fa-chart-bar',
      icon_color: '#1E90FF'
    },
    {
      title: 'Applications Submitted',
      count: '',
      icon: 'fas fa-trophy',
      icon_color: '#FFD700'
    },
    {
      title: 'Applications Approved',
      count: '',
      icon: 'fas fa-question-circle',
      icon_color: '#6495ED'
    }
  ];



  ngOnInit() {
    this.getStudents();
    this.getApplications(); 
  }

  getStudents(){
      this.isLoading = true;
      this.http.get<any[]>("http://localhost:8080/api/user/getalluserlist")
      .subscribe(
        (response)=>{
          console.log(response);
          this.students = response;
          this.homeBannerData[2].count = this.students.length;
        },
        (error)=>{
          this.toastr.error("Error Fetching Students Count");
        }
      )
  }

  getApplications(){
      this.http.get<any[]>("http://localhost:8080/api/application/getallapplications")
      .subscribe(
        (response)=>{
          console.log(response);
          this.applications = response;
          this.homeBannerData[3].count = this.applications.length;
          this.homeBannerData[4].count = this.applications.filter(app => app.status === 'approved').length;
          this.isLoading = false;
        },
        (error)=>{
          this.toastr.error("Error Fetching Application Count");
          this.isLoading = false;
        }
      )
  }

}
