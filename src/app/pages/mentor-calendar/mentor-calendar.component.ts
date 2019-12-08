import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../service/app.service';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-mentor-calendar',
  templateUrl: './mentor-calendar.component.html',
  styleUrls: ['./mentor-calendar.component.css']
})
export class MentorCalendarComponent implements OnInit {
  displayedColumns: string[] = ['startDate', 'startTime', 'endTime', 'calendarId'];
  calendars = [];
  times = [];
  userName = null;
  newTime = {startDate: null, startTime: null, endTime: null, userName: null};
  @ViewChild('calendarTable', {static: false}) table: MatTable<any>;

  constructor(private app: AppService) {
    this.times = this.app.getTimes();
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    if (this.userName) {
      this.newTime.userName = this.userName;
      this.app.getMentorCalendars(this.userName).subscribe(
        res => {
          if (res) {
            if (res.error || res.message) {
              console.log(res);
            } else {
              this.calendars = res;
            }
          }
        },
        error => {
          console.log('error:', error);
        }
      );
    }
  }

  save() {
    if (this.newTime.startDate && this.newTime.startTime && this.newTime.endTime && this.newTime.userName) {
      // this.app.saveMentorCalendar(this.newTime).subscribe(
      //   res => {
      //     if (res) {
      //       if (res.error || res.message) {
      //         console.log(res);
      //       } else {
      //         this.calendars.push(res);
      //         this.table.renderRows();
      //         this.newTime = {startDate: null, startTime: null, endTime: null, userName: this.userName};
      //         console.log('success');
      //       }
      //     }
      //   },
      //   error => {
      //     console.log('error:', error);
      //   }
      // );
    }
  }

  delete(calendar) {
    if (calendar) {
      this.app.deleteCalendar(calendar.calendarId).subscribe(
        res => {
          this.calendars.splice(this.calendars.indexOf(calendar), 1);
          this.table.renderRows();
        },
        error => {
          console.log('error:', error);
        }
      );
    }
  }
}
