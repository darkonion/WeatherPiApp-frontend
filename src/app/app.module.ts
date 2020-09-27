import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonsModule, ChartsModule, MDBBootstrapModule, NavbarModule, WavesModule} from "angular-bootstrap-md";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import { CurrentMeasurementsComponent } from './components/current-measurements/current-measurements.component';
import {BasicMeasurementService} from "./services/basic-measurement.service";
import {AirMeasurementService} from "./services/air-measurement.service";
import { HistoryAnalysisComponent } from './components/history-analysis/history-analysis.component';
import { HumidityAndPressureAnalysisComponent } from './components/humidity-and-pressure-analysis/humidity-and-pressure-analysis.component';
import { AirPurityAnalysisComponent } from './components/air-purity-analysis/air-purity-analysis.component';
import { TemperatureAnalysisComponent } from './components/temperature-analysis/temperature-analysis.component';


const routes: Routes = [
  {path: '', component: CurrentMeasurementsComponent},
  {path: 'history', component: HistoryAnalysisComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CurrentMeasurementsComponent,
    HistoryAnalysisComponent,
    HumidityAndPressureAnalysisComponent,
    AirPurityAnalysisComponent,
    TemperatureAnalysisComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NavbarModule, WavesModule,
    ButtonsModule,
    BrowserModule,
    NavbarModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    BasicMeasurementService,
    AirMeasurementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
