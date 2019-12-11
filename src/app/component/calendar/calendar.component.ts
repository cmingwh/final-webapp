import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  times = [];
  searchData = {from: '', to: ''};

  constructor(private app: AppService) {
    this.times = this.app.getTimes();
  }

  ngOnInit() {
  }

}
