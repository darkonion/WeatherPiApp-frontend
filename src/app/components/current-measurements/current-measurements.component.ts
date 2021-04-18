import { Component, OnInit } from '@angular/core';
import {BasicMeasurementService} from "../../services/basic-measurement.service";
import {BasicMeasurement} from "../../models/basic-measurement";
import {AirMeasurement} from "../../models/air-measurement";
import {AirMeasurementService} from "../../services/air-measurement.service";
import {Data} from 'angular-bootstrap-md/lib/free/utils/positioning/models';
import {interval, Subscription} from 'rxjs';
import {AirlyService} from "../../services/airly.service";

@Component({
  selector: 'app-current-measurements',
  templateUrl: './current-measurements.component.html',
  styleUrls: ['./current-measurements.component.scss']
})
export class CurrentMeasurementsComponent implements OnInit {

  private updateSubscription: Subscription;

  measurement: BasicMeasurement = new BasicMeasurement();
  measurementData: string = null;
  airMeasurement: AirMeasurement = new AirMeasurement();
  airMeasurementData: string = null;
  airMeasurementAirly: AirMeasurement = new AirMeasurement();
  alt: number = 52.143302;
  lng: number = 21.033467;

  color: string = "#00796b;"

  constructor(private basicMeasurementService: BasicMeasurementService,
              private airMeasurementService: AirMeasurementService,
              private airlyService: AirlyService) { }

  ngOnInit(): void {
    this.getBasicMeasurement();
    this.getAirMeasurement();
    this.getAirlyMeasurement();

    this.updateSubscription = interval(30000).subscribe(() => {
      this.getBasicMeasurement();
      this.getAirMeasurement();
    });
  }

  updateColor(pm25: number): void {
    if (this.airMeasurement.pm25 > 75) {
      this.color = "#991515";
    } else if (this.airMeasurement.pm25 > 50) {
      this.color = "#cb490e";
    } else if (this.airMeasurement.pm25 > 25) {
      this.color = "#b48705"
    } else {
      this.color = "#00796b";
    }
  }

  getAirlyMeasurement() {
    this.airlyService.getCurrentMeasurements(this.alt, this.lng).subscribe(data => {
      this.airMeasurementAirly.pm1 = Math.round(data.current.values[0].value);
      this.airMeasurementAirly.pm25 = Math.round(data.current.values[1].value);
      this.airMeasurementAirly.pm10 = Math.round(data.current.values[2].value);
    })
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
      this.updateColor(data.pm25);
      this.airMeasurementData = this.toDate(data).toLocaleString();
    });
  }

  roundResult(result: number) {
    return Math.round(result);
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
