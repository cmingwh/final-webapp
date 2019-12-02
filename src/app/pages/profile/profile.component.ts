import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    username: 'test@cn.ibm.com',
    firstName: 'Stanley',
    lastName: 'Jahnson'
  };

  constructor() { }

  ngOnInit() {
  }

}
