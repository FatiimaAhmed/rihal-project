import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { StudentsService } from 'src/app/students.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke
};

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  total: number = 0;
  public chartOptions: Partial<ChartOptions> | any;
  @Input() classes: any[] = [];

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.getTotal();
    this.chartOptions = {
      series: [],
      chart: {
        type: "donut",
        height: '230px'
      },
      stroke: {
        width: 1
      },
      plotOptions: {
        pie: {
          donut: {
            size: '83%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 500,
                color: "#4D4F5C",
              },
              total: {
                show: true,
                fontSize: '18px',
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 500,
                color: "#4D4F5C",
              }
            }
          }
        }
      },
      colors: ['#F08234', '#29CB97'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: 'right'
      },
      labels: ['Total', 'Class A'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: "top"
            }
          }
        }
      ]
    };
  }

  getTotal() {
    this.studentsService.getTotalstudents().subscribe((res: any) => {
      this.total = res.count;
      this.chartOptions.updateOptions = [{
        series: [{
          data: [this.total, 0],
          name: ['Total', 'Class A']
        }]
      }];
    }
      ,
      err => console.log(err));
  };

  onChange(e: any) {
    this.studentsService.getstudentsByClass(e.value).subscribe((res: any) => {
      this.chartOptions.updateOptions = [{
        series: [{
          data: [this.total, res.countOfStudents],
          name: ['Total', 'Class A']
        }]
      }];
    })
  }

}
