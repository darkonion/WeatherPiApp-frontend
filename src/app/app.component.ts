import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WeatherPiApp-frontend';
  isAdmin: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.checkRole().subscribe(data => {
      if (data === false || data === true) {
        this.isAdmin = data;
      };
    });
  }

  checkUser(): boolean {
    return this.isAdmin;
  }

  logout(): void {
    this.loginService.logout().subscribe(data => console.log(data));
    window.location.replace("/");
  }
}

