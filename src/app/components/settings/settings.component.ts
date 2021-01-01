import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Cron} from "../../models/cron";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public cron :Cron;
  private promise: Promise<unknown>;

  private isAdmin: boolean;

  cronFormGroup: FormGroup;
  airCrons :string[] = ["20 */5 * * * *", "20 */10 * * * *", "20 */15 * * * *", "20 */30 * * * *"];
  basicCrons :string[] = ["0 */5 * * * *", "0 */10 * * * *", "0 */15 * * * *", "0 */30 * * * *"];

  constructor(private formBuilder: FormBuilder, private settingsService : SettingsService, private loginService: LoginService) { }

  ngOnInit(): void {

    this.promise = new Promise((resolve) => {
      this.settingsService.getCurrentCron().subscribe(data => {
        this.cron = data, resolve(data);
      });
    });
    this.promise.then(() => {
      this.getCronFormGroup();
    });

    this.loginService.checkRole().subscribe(data => {
      if (data === false || data === true) {
        this.isAdmin = data;
      }
    });
  }

  private getCronFormGroup() {
    this.cronFormGroup = this.formBuilder.group({
      id: new FormControl(1),
      basicCron: new FormControl(this.cron.basicCron),
      airCron: new FormControl(this.cron.airCron)
    })
  }

  submitNewCron(): void {
    let cron: Cron = new Cron();
    cron.set(
      this.cronFormGroup.get("basicCron").value,
      this.cronFormGroup.get("airCron").value
    );
    console.log("Persisting new cron: " + cron.toString());

    this.settingsService.updateCron(cron).subscribe(data => console.log('Response status %d', data.status));
  }

  checkUser(): boolean {
    return this.isAdmin;
  }


}
