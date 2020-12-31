import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  invalidLogin = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.tryLogin(this.username, this.password).subscribe(response => {
      if (response.status === 200) {
        window.location.replace("/")
      } else {
        this.invalidLogin = true;
      }

    })
  }
}
