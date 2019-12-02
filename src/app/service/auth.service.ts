import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  constructor() { }

  isLogin() {
    const token = localStorage.getItem('access_token');
    if (token &&　!this.helper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
}
