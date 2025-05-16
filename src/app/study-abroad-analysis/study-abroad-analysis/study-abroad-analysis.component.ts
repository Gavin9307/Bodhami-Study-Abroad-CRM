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

  // For Country Level Analysis
  barChartOptions: ChartOptions = {
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
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];
  
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
    this.getApplicationsStatusCount();
    this.getApplicationCourseLevelCount();
  }



  getAllCountryApplicationsCount() {
    this.isLoading = true;
    this.http.get<any[]>("http://localhost:8080/api/analysis/getCountryApplicationsCount")
      .subscribe(
        (response) => {
          this.barChartLabels = response.map(item => item.countryName);
          this.barChartData = [
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
          

          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
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
}
