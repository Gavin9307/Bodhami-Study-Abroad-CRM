import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-study-abroad-analysis',
  templateUrl: './study-abroad-analysis.component.html',
  styleUrls: ['./study-abroad-analysis.component.css']
})
export class StudyAbroadAnalysisComponent implements OnInit {

  isLoading: Boolean = false;
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  // For Country Applications Analysis
  barChartOptionsCountryApplications: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: false
          }
        }
      ]
    },
    legend: {
      display: true
    }
  };
  barChartLabelsCountryApplications: string[] = [];
  barChartTypeCountryApplications: ChartType = 'bar';
  barChartLegendCountryApplications = true;
  barChartDataCountryApplications: any[] = [];
  barChartColorsCountryApplications: any[] = [
    {
      backgroundColor: '#B39DDB',
      borderColor: '#7E57C2',
      borderWidth: 1
    }
  ];

  // For University Applications Analysis
  barChartOptionsUniversityApplications: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: false
          }
        }
      ]
    },
    legend: {
      display: true
    }
  };
  barChartLabelsUniversityApplications: string[] = [];
  barChartTypeUniversityApplications: ChartType = 'bar';
  barChartLegendUniversityApplications = true;
  barChartDataUniversityApplications: any[] = [];
  barChartColorsUniversityApplications: any[] = [
    {
      backgroundColor: '#F48FB1',
      borderColor: '#EC407A',
      borderWidth: 1
    }
  ];

  barChartOptionsCourseApplications: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45,
            fontSize: 10
          }
        }
      ]
    },
    legend: {
      display: true
    }
  };
  barChartLabelsCourseApplications: string[] = [];
  barChartTypeCourseApplications: ChartType = 'bar';
  barChartLegendCourseApplications = true;
  barChartDataCourseApplications: any[] = [];
  barChartColorsCourseApplications: any[] = [
    {
      backgroundColor: '#81D4FA',
      borderColor: '#29B6F6',
      borderWidth: 1
    }
  ];


  // For Application Status Analysis
  pieChartOptions: ChartOptions = { responsive: true };
  pieChartLabels: String[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors: Array<any> = [
    {
      backgroundColor: []
    }
  ];

  // For User Applications Analysis
  pieChartOptionsUserApplications: ChartOptions = { responsive: true };
  pieChartLabelsUserApplications: String[] = [];
  pieChartDataUserApplications: number[] = [];
  pieChartTypeUserApplications: ChartType = 'pie';
  pieChartLegendUserApplications = true;
  pieChartColorsUserApplications: Array<any> = [
    {
      backgroundColor: []
    }
  ];


  // For Application Course Level Analysis
  barChartOptionsApplicationCourseLevel: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: false
          }
        }
      ]
    },
    legend: {
      display: true
    }
  };
  barChartLabelsApplicationCourseLevel: string[] = [];
  barChartTypeApplicationCourseLevel: ChartType = 'bar';
  barChartLegendApplicationCourseLevel = true;
  barChartDataApplicationCourseLevel: any[] = [];


  ngOnInit() {
    this.getAllCountryApplicationsCount();
    this.getAllUniversityApplicationsCount();
    this.getAllCourseApplicationsCount();
    this.getApplicationsStatusCount();
    this.getApplicationCourseLevelCount();
    this.getUserApplicationsInfo();
  }



  getAllCountryApplicationsCount() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/analysis/getCountryApplicationsCount")
      .subscribe(
        (response) => {
          this.barChartLabelsCountryApplications = response.map(item =>
            item.countryName.length > 15 ? item.countryName.slice(0, 18) + '...' : item.countryName
          );

          this.barChartDataCountryApplications = [
            {
              data: response.map(item => item.applicationCount),
              label: 'Applications'
            }
          ];
        },
        (error) => {
          this.toastr.error("Error Fetching Countries Application Count");
        }
      );
  }

  getAllUniversityApplicationsCount() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/analysis/getUniversityApplicationsCount")
      .subscribe(
        (response) => {
          this.barChartLabelsUniversityApplications = response.map(item =>
            item.universityName.length > 15 ? item.universityName.slice(0, 18) + '...' : item.universityName
          );
          this.barChartDataUniversityApplications = [
            {
              data: response.map(item => item.applicationCount),
              label: 'Applications'
            }
          ];
        },
        (error) => {
          this.toastr.error("Error Fetching Universities Application Count");
        }
      );
  }

  getAllCourseApplicationsCount() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/analysis/getCourseApplicationsCount")
      .subscribe(
        (response) => {
          this.barChartLabelsCourseApplications = response.map(item =>
            item.courseName.length > 12 ? item.courseName.slice(0, 18) + '...' : item.courseName
          );
          this.barChartDataCourseApplications = [
            {
              data: response.map(item => item.applicationCount),
              label: 'Applications',
            }
          ];

        },
        (error) => {
          this.toastr.error("Error Fetching Courses Application Count");
        }
      );
  }

  getApplicationsStatusCount() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/analysis/getApplicationsStatusCount")
      .subscribe(
        (response) => {
          this.pieChartLabels = response.map(item =>
            item.statusName.charAt(0).toUpperCase() + item.statusName.slice(1)
          );
          this.pieChartData = response.map(item => item.applicationCount);

          // Define color mapping for each status
          const colorMap: any = {
            'approved': '#4caf50',      // green
            'submitted': '#2196f3',     // blue
            'in-progress': '#ff9800',   // orange
            'rejected': '#f44336'       // red
          };

          // Assign colors based on response
          this.pieChartColors[0].backgroundColor = response.map(item => colorMap[item.statusName.toLowerCase()] || '#9e9e9e'); // default: gray

        },
        (error) => {
          this.toastr.error("Error Fetching Application Status Count");
        }
      );
  }

  getApplicationCourseLevelCount() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/analysis/getApplicationCourseLevelCount")
      .subscribe(
        (response) => {
          this.barChartLabelsApplicationCourseLevel = response.map(item => item.courseLevel);
          this.barChartDataApplicationCourseLevel = [
            {
              data: response.map(item => item.applicationCount),
              label: 'Applications'
            }
          ];
        },
        (error) => {
          this.toastr.error("Error Fetching Application Course Level Count");
        }
      );
  }

  getUserApplicationsInfo() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/analysis/getUserApplicationsInfo")
      .subscribe(
        (response) => {
          this.pieChartLabelsUserApplications = [ "Students With Applications", "Students Without Applications"];
          this.pieChartDataUserApplications = [ response[0].usersWithApplications, response[0].usersWithoutApplications];

          this.pieChartColorsUserApplications = [{
            backgroundColor: [ '#66BB6A', '#EF5350']
          }];
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error("Error Fetching User Applications Info Count");
        }
      );
  }
}
