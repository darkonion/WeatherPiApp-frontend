import { Component, OnInit } from '@angular/core';
import {AirMeasurement} from "../../models/air-measurement";
import {AirMeasurementService} from "../../services/air-measurement.service";

@Component({
  selector: 'app-air-purity-analysis',
  templateUrl: './air-purity-analysis.component.html',
  styleUrls: ['./air-purity-analysis.component.scss']
})
export class AirPurityAnalysisComponent implements OnInit {

  public measurements: AirMeasurement[] = [];

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: 'PM1.0' },
    { data: [], label: 'PM2.5' },
    { data: [], label: 'PM10' },
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time'
        },
        ticks: {
          maxTicksLimit: 15,
          maxRotation: 0,
          padding: 10
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Concentration [μg/m3]',
        }},
      ]
    }
  };

  constructor(private airMeasurementService: AirMeasurementService) { }

  ngOnInit(): void {
    this.getMeasurements();
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getMeasurements(): void {
    this.airMeasurementService.getAirMeasurementList().subscribe(data => {
      this.measurements = data
      this.chartDatasets = [
        { data: Array.of(data.map(m => m.pm1))[0], label: 'PM1.0' },
        { data: Array.of(data.map(m => m.pm25))[0], label: 'PM2.5' },
        { data: Array.of(data.map(m => m.pm10))[0], label: 'PM10' }
      ];
      this.chartLabels = Array.of(data.map(m => this.toTime(m)))[0]
    })
  }

  toTime(measurement: AirMeasurement): string {
    let minutes: string = measurement.date[4];
    let hours: string = measurement.date[3];

    if (measurement.date[4] < 10) {
      minutes = '0' + measurement.date[4];
    }

    if (measurement.date[3] < 10) {
      hours = '0' + measurement.date[3];
    }

    return hours + ':' + minutes;
  }

}
