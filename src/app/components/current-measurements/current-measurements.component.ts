import { Component, OnInit } from '@angular/core';
import {BasicMeasurementService} from "../../services/basic-measurement.service";
import {BasicMeasurement} from "../../models/basic-measurement";
import {AirMeasurement} from "../../models/air-measurement";
import {AirMeasurementService} from "../../services/air-measurement.service";
import {Data} from 'angular-bootstrap-md/lib/free/utils/positioning/models';

@Component({
  selector: 'app-current-measurements',
  templateUrl: './current-measurements.component.html',
  styleUrls: ['./current-measurements.component.scss']
})
export class CurrentMeasurementsComponent implements OnInit {

  measurement: BasicMeasurement = new BasicMeasurement();
  measurementData: string = null;
  airMeasurement: AirMeasurement = new AirMeasurement();
  airMeasurementData: string = null;

  constructor(private basicMeasurementService: BasicMeasurementService,
              private airMeasurementService: AirMeasurementService) { }

  ngOnInit(): void {
    this.getBasicMeasurement();
    this.getAirMeasurement();
  }

  getBasicMeasurement() {
    this.basicMeasurementService.getBasicMeasurement().subscribe(data => {
      console.log(`loading basic measurement with id: ${data.id}`);
      this.measurement = data;
      this.measurementData = this.toDate(data).toLocaleString();
    });
  }

  getAirMeasurement() {
    this.airMeasurementService.getAirMeasurement().subscribe(data => {
      console.log(`loading air measurement with id: ${data.id}`);
      this.airMeasurement = data;
      this.airMeasurementData = this.toDate(data).toLocaleString();
    });
  }

  toDate(measurement): Date {
    const year = measurement.date[0];
    const month = measurement.date[1];
    const day = measurement.date[2];
    const hour = measurement.date[3];
    const minute = measurement.date[4];

    return new Date(Date.UTC(year, month-1, day, hour-2, minute));
  }
}
