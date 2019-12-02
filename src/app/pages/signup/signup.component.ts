import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  roles = [
    { value: 'ROLE_user', viewValue: 'Staff' },
    { value: 'ROLE_mentor', viewValue: 'Mentor' },
  ];

  user = {
    userName: null, password: null, repassword: null, firstName: null, lastName: null,
    contactNumber: null, linedinUrl: null, yearsOfExperience: null, role: null, roles: []
  };

  userName = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  repassword = new FormControl('', [Validators.required]);

  constructor(private app: AppService, private auth: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    if (this.user.password !== this.user.repassword) {
      //repasswordValidation
      this.repassword.setErrors({'Re password not equals password': true});
      return;
    }
    if (!this.user.userName || !this.user.password || !this.user.repassword || !this.user.firstName
      || !this.user.lastName) {
      return;
    }
    this.app.signup(this.user).subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
            this.router.navigate(['login'], { queryParams: { signup: 'failed' } });
          } else {
            this.router.navigate(['login'], { queryParams: { signup: res.result } });
          }
        }
      },
      error => {
        console.log('error');
      }
    );
  }
}
