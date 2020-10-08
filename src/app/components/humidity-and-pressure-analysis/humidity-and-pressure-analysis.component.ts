import { Component, OnInit } from '@angular/core';
import {BasicMeasurement} from "../../models/basic-measurement";
import {BasicMeasurementService} from "../../services/basic-measurement.service";
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-humidity-and-pressure-analysis',
  templateUrl: './humidity-and-pressure-analysis.component.html',
  styleUrls: ['./humidity-and-pressure-analysis.component.scss']
})
export class HumidityAndPressureAnalysisComponent implements OnInit {

  private updateSubscription: Subscription;

  public measurements: BasicMeasurement[] = [];

  public measurementPeriod: string = '?int=2';
  public periodLabel: string = 'last 24h';

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Humidity', yAxisID: 'first-y-axis' },
    { data: [], label: 'Pressure', yAxisID: 'second-y-axis'}
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(11,57,243,0.4)',
      borderColor: 'rgba(0,10,130,0.8)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 121, 107,0.4)',
      borderColor: 'rgb(64, 128 ,25, .8)',
      borderWidth: 2,
    },

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
        id: 'first-y-axis',
        type: 'linear',
        gridLines: {
          color: 'rgb(73,73,73)'
        },
        ticks: {
          fontColor: 'rgb(180,180,180)'
        },
        scaleLabel: {
          display: true,
          labelString: 'Humidity [%]',
        }
      }, {
        id: 'second-y-axis',
        type: 'linear',
        gridLines: {
          color: 'rgb(73,73,73)'
        },
        ticks: {
          fontColor: 'rgb(180,180,180)'
        },
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: 'Pressure [hPa]',
        }},
      ]
    }
  };

  constructor(private basicMeasurementService: BasicMeasurementService) { }

  ngOnInit(): void {
    this.getMeasurements();
    this.updateSubscription = interval(30000).subscribe(() => this.getMeasurements());
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getMeasurements(): void {
    this.basicMeasurementService.getBasicMeasurementList(this.measurementPeriod).subscribe(data => {
      this.measurements = data
      this.chartDatasets = [
        {data: Array.of(data.map(m => m.humidity).filter(m => m > 0.1 && m < 100))[0], label: 'Humidity', yAxisID: 'first-y-axis'},
        {data: Array.of(data.map(m => m.pressure).filter(m => m < 1100 && m > 900))[0], label: 'Pressure', yAxisID: 'second-y-axis'}
      ];
      this.chartLabels = data.map(m => this.toDate(m));
    })
  }

  toDate(measurement: BasicMeasurement): Date {
    const year = measurement.date[0];
    const month = measurement.date[1];
    const day = measurement.date[2];
    const hour = measurement.date[3];
    const minute = measurement.date[4];

    return new Date(Date.UTC(year, month-1, day, hour-2, minute));
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
