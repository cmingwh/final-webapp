import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  times = [];
  searchData = {startDate: '', startTime: '', endTime: ''};

  constructor(private app: AppService) {
    this.times = this.app.getTimes();
  }

  ngOnInit() {
  }

}
