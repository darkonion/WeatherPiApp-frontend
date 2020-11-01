import { Component, OnInit } from '@angular/core';
import {AirMeasurement} from "../../models/air-measurement";
import {AirMeasurementService} from "../../services/air-measurement.service";
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-air-purity-analysis',
  templateUrl: './air-purity-analysis.component.html',
  styleUrls: ['./air-purity-analysis.component.scss']
})
export class AirPurityAnalysisComponent implements OnInit {

  private updateSubscription: Subscription;

  public measurements: AirMeasurement[] = [];

  public measurementPeriod: string = '?int=1';
  public periodLabel: string = 'last 24h';

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: 'PM1.0' },
    { data: [], label: 'PM2.5' },
    { data: [], label: 'PM10' },
  ];

  public chartLabels: Array<any> = [];

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

  public chartOptions: any = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          fontColor: 'rgb(180,180,180)'
        },
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

  constructor(private airMeasurementService: AirMeasurementService) { }

  ngOnInit(): void {
    this.getMeasurements();
    this.updateSubscription = interval(30000).subscribe(() => this.getMeasurements());
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getMeasurements(): void {
    this.airMeasurementService.getAirMeasurementList(this.measurementPeriod).subscribe(data => {
      this.measurements = data;
      this.chartDatasets = [
        { data: Array.of(data.map(m => m.pm1))[0], label: 'PM1.0' },
        { data: Array.of(data.map(m => m.pm25))[0], label: 'PM2.5' },
        { data: Array.of(data.map(m => m.pm10))[0], label: 'PM10' }
      ];
      this.chartLabels = data.map(m => this.toDate(m));
    });
  }

  toDate(measurement: AirMeasurement): Date {
    const year = measurement.date[0];
    const month = measurement.date[1];
    const day = measurement.date[2];
    const hour = measurement.date[3];
    const minute = measurement.date[4];

    return new Date(Date.UTC(year, month-1, day, hour-1, minute));
  }

  changePeriod(daysCount: number): void {
    let interval = 2;

    if (daysCount === 1) {
      this.periodLabel = 'last 24h';
      this.measurementPeriod = '?int=2';
      this.ngOnInit();
      return;
    } else if (daysCount === 3) {
      this.periodLabel = 'last three days';
      interval = 5;
    } else if (daysCount === 5) {
      this.periodLabel = 'last five days';
      interval = 10;
    }

    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() - daysCount);
    this.measurementPeriod = '?int=' + interval + '&from=' + dateNow.toISOString();
    this.ngOnInit();
  }


}
