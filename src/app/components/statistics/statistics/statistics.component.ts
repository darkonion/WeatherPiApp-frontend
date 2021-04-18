import { Component, OnInit } from '@angular/core';
import {StatisticsService} from "../../../services/statistics.service";
import {AirMeasurement} from "../../../models/air-measurement";
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as Chart from "chart.js";


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  private dailyDayPeriod = 7;
  private monthlyDayPeriod = 365;

  public dailyLatestAverage: AirMeasurement;
  public monthlyLatestAverage: AirMeasurement;

  public chartType: string = 'bar';

  public chartLabels1: Array<any> = [];
  public chartLabels2: Array<any> = [];

  public chartDatasets1: Array<any> = [
    { data: [], label: 'PM1.0' },
    { data: [], label: 'PM2.5' },
    { data: [], label: 'PM10' },
  ];

  public chartDatasets2: Array<any> = [
    { data: [], label: 'PM1.0' },
    { data: [], label: 'PM2.5' },
    { data: [], label: 'PM10' },
  ];

  public chartColors: Array<any> = [

    {
      backgroundColor: 'rgb(241,255,71, .4)',
      borderColor: 'rgba(239,255,29,0.8)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(105, 0, 132, .4)',
      borderColor: 'rgba(206,72,116,0.8)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgb(102,102,102, .4)',
      borderColor: 'rgba(201,201,201,0.8)',
      borderWidth: 2,
    }

  ];

  public chartOptions1: any = {
    maintainAspectRatio: false,
    responsive: true,
    annotation: {
      annotations: [{
        type:'line',
        scaleID: 'y-axis-0',
        mode:'horizontal',
        value:'25',
        borderColor:'#e07b10',
        borderWidth:1,
        label: {
          backgroundColor: 'rgb(189,141,11)',
          font: {
            family: "sans-serif",
            size: 8,
            color: "#fff",
          },
          xPadding: 2,
          yPadding: 2,
          cornerRadius: 3,
          position: "left",
          xAdjust: 0,
          yAdjust: 0,
          enabled: true,
          content: "WHO limit",
          rotation: 90,
        }
      }, {
        type:'line',
        scaleID: 'y-axis-0',
        mode:'horizontal',
        value:'50',
        borderColor:'#ac1616',
        borderWidth:1,
        label: {
          backgroundColor: 'rgb(215,48,48)',
          font: {
            family: "sans-serif",
            size: 8,
            color: "#fff",
          },
          xPadding: 2,
          yPadding: 2,
          cornerRadius: 3,
          position: "left",
          xAdjust: 0,
          yAdjust: 0,
          enabled: true,
          content: "PL limit",
          rotation: 90,
        }
      }]
    },
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          fontColor: 'rgb(180,180,180)'
        },
        time: {
          unit: 'day',
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: 'rgb(180,180,180)'
        },
        gridLines: {
          color: 'rgb(73,73,73)'
        },
        scaleLabel: {
          display: true,
          labelString: 'Concentration [μg/m3]',

        }},
      ]
    }
  };

  public chartOptions2: any = {
    maintainAspectRatio: false,
    responsive: true,
    annotation: {
      annotations: [{
        type:'line',
        scaleID: 'y-axis-0',
        mode:'horizontal',
        value:'25',
        borderColor:'#e07b10',
        borderWidth:1,
        label: {
          backgroundColor: 'rgb(189,141,11)',
          font: {
            family: "sans-serif",
            size: 8,
            color: "#fff",
          },
          xPadding: 2,
          yPadding: 2,
          cornerRadius: 3,
          position: "left",
          xAdjust: 0,
          yAdjust: 0,
          enabled: true,
          content: "WHO limit",
          rotation: 90,
        }
      }, {
        type:'line',
        scaleID: 'y-axis-0',
        mode:'horizontal',
        value:'50',
        borderColor:'#ac1616',
        borderWidth:1,
        label: {
          backgroundColor: 'rgb(215,48,48)',
          font: {
            family: "sans-serif",
            size: 8,
            color: "#fff",
          },
          xPadding: 2,
          yPadding: 2,
          cornerRadius: 3,
          position: "left",
          xAdjust: 0,
          yAdjust: 0,
          enabled: true,
          content: "PL limit",
          rotation: 90,
        }
      }]
    },
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          fontColor: 'rgb(180,180,180)'
        },
        time: {
          unit: 'month',
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: 'rgb(180,180,180)'
        },
        gridLines: {
          color: 'rgb(73,73,73)'
        },
        scaleLabel: {
          display: true,
          labelString: 'Concentration [μg/m3]',
        }},
      ]
    }
  };

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    let namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation["id"]="annotation";
    Chart.pluginService.register( namedChartAnnotation);

    this.initializeChartData();
    this.statisticsService.getLatestDaily().subscribe(data => this.dailyLatestAverage = data);
    this.statisticsService.getLatestMonthly().subscribe(data => this.monthlyLatestAverage = data);

  }

  initializeChartData() {
    const dateFromDaily = new Date();
    dateFromDaily.setHours(0,0,0,0);
    dateFromDaily.setDate(dateFromDaily.getDate() - this.dailyDayPeriod);

    const dateFromMonthly = new Date();
    dateFromMonthly.setHours(0,0,0,0);
    dateFromMonthly.setDate(dateFromMonthly.getDate() - this.monthlyDayPeriod);

    this.statisticsService.getDailyList('?int=1&from=' + dateFromDaily.toISOString())
      .subscribe(data => {
        this.chartDatasets1 = [
          { data: Array.of(data.map(m => m.pm1))[0], label: 'PM1.0' },
          { data: Array.of(data.map(m => m.pm25))[0], label: 'PM2.5' },
          { data: Array.of(data.map(m => m.pm10))[0], label: 'PM10' }
        ];
        this.chartLabels1 = data.map(m => this.toDate(m));
        const offsetDate = new Date();
        offsetDate.setDate(offsetDate.getDate() - 1);
        this.chartLabels1.push(offsetDate);
      });

    this.statisticsService.getMonthlyList('?int=1&from=' + dateFromMonthly.toISOString())
      .subscribe(data => {
        this.chartDatasets2 = [
          { data: Array.of(data.map(m => m.pm1))[0], label: 'PM1.0' },
          { data: Array.of(data.map(m => m.pm25))[0], label: 'PM2.5' },
          { data: Array.of(data.map(m => m.pm10))[0], label: 'PM10' }
        ];
        this.chartLabels2 = data.map(m => this.toDate(m));
        const offsetDate = new Date();
        offsetDate.setDate(offsetDate.getDate() - 30);
        this.chartLabels2.push(offsetDate);
      });
  }

  toDate(measurement: AirMeasurement): Date {
    const year = measurement.date[0];
    const month = measurement.date[1];
    const day = measurement.date[2];
    const hour = measurement.date[3];
    const minute = measurement.date[4];

    return new Date(Date.UTC(year, month-1, day, hour-2, minute));
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
