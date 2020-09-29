import { Component, OnInit } from '@angular/core';
import {AirMeasurement} from "../../models/air-measurement";
import {AirMeasurementService} from "../../services/air-measurement.service";
import {BasicMeasurement} from "../../models/basic-measurement";

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
        type: 'time',
        time: {
          displayFormats: {
            minute: 'HH:mm DD[th]'
          },
          minUnit: 'minute',
          unitStepSize: 120,
          tooltipFormat: 'HH:mm',
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
      this.chartLabels = data.map(m => this.toDate(m));
    })
  }

  toDate(measurement: AirMeasurement): Date {
    const year = measurement.date[0];
    const month = measurement.date[1];
    const day = measurement.date[2];
    const hour = measurement.date[3];
    const minute = measurement.date[4];

    return new Date(Date.UTC(year, month-1, day, hour-2, minute));
  }

}
