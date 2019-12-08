import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { userName: '', password: '' };
  constructor(private app: AppService, private auth: AuthService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.isLogin()) {
      this.router.navigate(['userpages']);
    }
  }

  login() {
    this.app.authenticate(this.credentials).subscribe(
      res => {
        if (res.token) {
          localStorage.setItem('access_token', res.token);
          const helper = new JwtHelperService();
          const tokenPayload = helper.decodeToken(res.token);
          localStorage.setItem('userName', tokenPayload.sub);
          localStorage.setItem('expirationDate', tokenPayload.exp);
          // const expirationDate = helper.getTokenExpirationDate(res.token);
          this.app.getMyInfo().subscribe(res => {
            return res;
          });
          this.router.navigate(['search']);
        } else {
          this.router.navigate(['login']);
        }
      },
      error => {
        console.log("error");
      }
    );
  }
}
