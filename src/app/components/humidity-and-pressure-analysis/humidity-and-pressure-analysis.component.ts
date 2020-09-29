import { Component, OnInit } from '@angular/core';
import {BasicMeasurement} from "../../models/basic-measurement";
import {BasicMeasurementService} from "../../services/basic-measurement.service";

@Component({
  selector: 'app-humidity-and-pressure-analysis',
  templateUrl: './humidity-and-pressure-analysis.component.html',
  styleUrls: ['./humidity-and-pressure-analysis.component.scss']
})
export class HumidityAndPressureAnalysisComponent implements OnInit {

  public measurements: BasicMeasurement[] = [];

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Humidity', yAxisID: 'first-y-axis' },
    { data: [], label: 'Pressure', yAxisID: 'second-y-axis'}
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
        id: 'first-y-axis',
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Humidity [%]'
        }
      },{
        id: 'second-y-axis',
        type: 'linear',
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
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getMeasurements(): void {
    this.basicMeasurementService.getBasicMeasurementList().subscribe(data => {
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
}
