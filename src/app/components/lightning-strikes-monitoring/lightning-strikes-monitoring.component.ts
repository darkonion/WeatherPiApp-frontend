import {Component, OnInit} from '@angular/core';
import {Lightning} from "../../models/lightning";
import {LightningStrikesService} from "../../services/lightning-strikes.service";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-lightning-strikes-monitoring',
  templateUrl: './lightning-strikes-monitoring.component.html',
  styleUrls: ['./lightning-strikes-monitoring.component.scss']
})
export class LightningStrikesMonitoringComponent implements OnInit {

  private updateSubscription: Subscription;

  public lightnings: Lightning[] = [];

  constructor(private lightningService: LightningStrikesService) {
  }

  ngOnInit(): void {
    this.getLightningStrikes();
    this.updateSubscription = interval(5000).subscribe(() => this.getLightningStrikes());
  }

  getLightningStrikes(): void {
    this.lightningService.getLatestLightnings().subscribe(data => {
      data.map(d => d.date = this.toDate(d))
      this.lightnings = data;
      console.log(new Date())
    })
  }

  last10Minutes(date: Date): boolean
  {
    let now = new Date();
    now.setMinutes(now.getMinutes() - 10);
    return date.getTime() > now.getTime();
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
