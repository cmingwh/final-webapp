import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName = null;
  constructor(private router: Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    if (!this.userName) {
      this.router.navigate(['login']);
    }
  }

}
