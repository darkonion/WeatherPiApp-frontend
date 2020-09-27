import { Component, OnInit } from '@angular/core';
import {BasicMeasurement} from "../../models/basic-measurement";
import {BasicMeasurementService} from "../../services/basic-measurement.service";

@Component({
  selector: 'app-temperature-analysis',
  templateUrl: './temperature-analysis.component.html',
  styleUrls: ['./temperature-analysis.component.scss']
})
export class TemperatureAnalysisComponent implements OnInit {

  public measurements: BasicMeasurement[] = [];

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Temperature', yAxisID: 'first-y-axis' },
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
          padding: 10,
        }
      }],
      yAxes: [{
        id: 'first-y-axis',
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Humidity [%]'
        }
      }]
    }
  };

  constructor(private basicMeasurementService: BasicMeasurementService) { }

  ngOnInit(): void {
    this.getMeasurements();
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getMeasurements(): void {
    this.basicMeasurementService.getBasicMeasurementList().subscribe(data => {
      this.measurements = data
      this.chartDatasets = [
        {data: Array.of(data.map(m => m.temperature))[0], label: 'Temperature', yAxisID: 'first-y-axis'}
      ];
      this.chartLabels = Array.of(data.map(m => this.toTime(m)))[0];
    })
  }

  toTime(measurement: BasicMeasurement): string {
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
