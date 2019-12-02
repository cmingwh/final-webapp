import { Component, OnInit } from '@angular/core';
import { AppService } from './service/app.service';
import { AuthService } from './service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myapp';
  signupSuccess = false;
  userExists = false;
  signupFailed = false;

  constructor(private app: AppService, private http: HttpClient,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const signupResult = params.signup;
      if (signupResult === 'success') {
        this.signupSuccess = true;
      }
      if (signupResult === 'exists') {
        this.userExists = true;
      }
      if (signupResult === 'failed') {
        this.signupFailed = true;
      }
    });
  }
}
