import { Component, OnInit } from '@angular/core';
import {BasicMeasurement} from "../../models/basic-measurement";
import {BasicMeasurementService} from "../../services/basic-measurement.service";
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-temperature-analysis',
  templateUrl: './temperature-analysis.component.html',
  styleUrls: ['./temperature-analysis.component.scss']
})
export class TemperatureAnalysisComponent implements OnInit {

  private updateSubscription: Subscription;

  public measurements: BasicMeasurement[] = [];

  public measurementPeriod: string = '?int=2';
  public periodLabel: string = 'last 24h';

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Temperature', yAxisID: 'first-y-axis' },
    { data: [], label: 'Light', yAxisID: 'second-y-axis' },
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgb(241,255,71, .2)',
      borderColor: 'rgba(239,255,29,0.7)',
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
        id: 'first-y-axis',
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Temperature [°C]'
        }
      }, {
        id: 'second-y-axis',
        type: 'linear',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: 'Light [lux]'
        }
      }]
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
    console.log(new Date());
    this.basicMeasurementService.getBasicMeasurementList(this.measurementPeriod).subscribe(data => {
      this.measurements = data;
      this.chartDatasets = [
        {data: data.map(m => m.temperature), label: 'Temperature', yAxisID: 'first-y-axis'},
        {data: data.map(m => m.lux), label: 'Light', yAxisID: 'second-y-axis'}
      ];
      this.chartLabels = data.map(m => this.toDate(m));
    });
  }

  toDate(measurement: BasicMeasurement): Date {
    const year = measurement.date[0];
    const month = measurement.date[1];
    const day = measurement.date[2];
    const hour = measurement.date[3];
    const minute = measurement.date[4];

    return new Date(Date.UTC(year, month - 1, day, hour - 2, minute));
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
