import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../service/app.service';
import { MatTable } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-pages',
  templateUrl: './user-pages.component.html',
  styleUrls: ['./user-pages.component.css']
})
export class UserPagesComponent implements OnInit {

  currentColumns = ['skillName', 'time', 'progress', 'mentorName', 'action'];
  closedColumns = ['skillName', 'time', 'mentorName'];

  userName = null;
  currentList = [];
  closedList = [];
  @ViewChild('currentTable', {static: false}) currentTable: MatTable<any>;
  @ViewChild('closedTable', {static: false}) closedTable: MatTable<any>;

  constructor(private app: AppService, private router: Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    if (!this.userName) {
      this.router.navigate(['login']);
    }
  }

}
