import { Component, OnInit } from '@angular/core';
import {BasicMeasurementService} from "../../services/basic-measurement.service";
import {BasicMeasurement} from "../../models/basic-measurement";
import {AirMeasurement} from "../../models/air-measurement";
import {AirMeasurementService} from "../../services/air-measurement.service";

@Component({
  selector: 'app-current-measurements',
  templateUrl: './current-measurements.component.html',
  styleUrls: ['./current-measurements.component.scss']
})
export class CurrentMeasurementsComponent implements OnInit {

  measurement: BasicMeasurement = new BasicMeasurement();
  airMeasurement: AirMeasurement = new AirMeasurement();

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
    });
  }

  getAirMeasurement() {
    this.airMeasurementService.getAirMeasurement().subscribe(data => {
      console.log(`loading air measurement with id: ${data.id}`);
      this.airMeasurement = data;
    });
  }
}
