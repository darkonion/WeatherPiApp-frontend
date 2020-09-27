import { Component, OnInit } from '@angular/core';
import {BasicMeasurement} from "../../models/basic-measurement";
import {BasicMeasurementService} from "../../services/basic-measurement.service";
import {AirMeasurement} from "../../models/air-measurement";
import {AirMeasurementService} from "../../services/air-measurement.service";


@Component({
  selector: 'app-history-analysis',
  templateUrl: './history-analysis.component.html',
  styleUrls: ['./history-analysis.component.scss']
})
export class HistoryAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
