import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../service/app.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName;

  constructor(private app: AppService, private auth: AuthService, private http: HttpClient, private router: Router) {
  }
  ngOnInit() {
    if (this.auth.isLogin()) {
      this.userName = localStorage.getItem('userName');
    }
  }

  logout() {
    localStorage.removeItem('tokenPayload');
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  login() {
    this.router.navigate(['login']);
  }

  signup() {
    this.router.navigate(['signup']);
  }

  authenticated() {
    return this.auth.isLogin();
  }
}
