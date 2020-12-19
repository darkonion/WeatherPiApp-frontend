import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Cron} from "../../models/cron";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public cron :Cron;
  private promise: Promise<unknown>;

  cronFormGroup: FormGroup;
  airCrons :string[] = ["0 */5 * * * *", "0 */10 * * * *", "0 */15 * * * *", "0 */30 * * * *"];
  basicCrons :string[] = ["0 */5 * * * *", "0 */10 * * * *", "0 */15 * * * *", "0 */30 * * * *"];

  constructor(private formBuilder: FormBuilder, private settingsService : SettingsService) { }

  ngOnInit(): void {

    this.promise = new Promise((resolve) => {
      this.settingsService.getCurrentCron().subscribe(data => {
        this.cron = data, resolve(data);
      });
    });
    this.promise.then(() => {
      this.getCronFormGroup();
    });
  }

  private getCronFormGroup() {
    this.cronFormGroup = this.formBuilder.group({
      id: new FormControl(1),
      basicCron: new FormControl(this.cron.basicCron),
      airCron: new FormControl(this.cron.airCron)
    })
  }

  compareAirCron(item1) {
    return item1.equals(this.cron.airCron);
  }

  compareBasicCron(item1, item2): boolean {
    return item1.split("/")[1].split(" ")[0] == this.cron.airCron.split("/")[1].split(" ")[0];
  }

}
