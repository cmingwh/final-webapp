import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  
  dataSource = [
    {userName: 'Paris', role: 'trainee', status: 'unblock', action: ''},
    {userName: 'Neo', role: 'mentor', status: 'unblock', action: ''}
  ];

  displayedColumns: string[] = ['userName', 'role', 'status', 'action'];

  constructor() { }

  ngOnInit() {
  }

  block(element){
    alert(element.userName + ' blocked!');
  }
}
