import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { ProposeComponent } from '../propose/propose.component';
import { MentorSkillsComponent } from '../../component/mentor-skills/mentor-skills.component';
import { CalendarComponent } from '../../component/calendar/calendar.component';
import { AppService } from '../../service/app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-training-search',
  templateUrl: './training-search.component.html',
  styleUrls: ['./training-search.component.css']
})

export class TrainingSearchComponent implements OnInit {

  @ViewChild('selSkills', { static: false }) selSkills: MentorSkillsComponent;
  @ViewChild('selCalendar', { static: false }) selCalendar: CalendarComponent;
  @ViewChild('calendarTable', {static: false}) calendarTable: MatTable<any>;

  displayedColumns: string[] = ['trainer', 'startTime', 'action'];
  calendars = [];

  constructor(public dialog: MatDialog, private app: AppService) { }

  ngOnInit() {
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ProposeComponent, {
      width: '450px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  search() {
    if (this.selSkills.selectedSkill && this.selCalendar.searchData.startDate &&
       this.selCalendar.searchData.startTime && this.selCalendar.searchData.endTime) {
      const startDate = moment(this.selCalendar.searchData.startDate).format('YYYY-MM-DD');
      const calendar = {
        skillId: this.selSkills.selectedSkill,
        startDate: startDate,
        startTime: this.selCalendar.searchData.startTime,
        endTime: this.selCalendar.searchData.endTime,
        status: 'new'
      };
      this.app.searchCalendar(calendar).subscribe(
        res => {
          if (res) {
            if (res.error || res.message) {
              console.log(res);
            } else {
              this.calendars = res;
              this.calendarTable.renderRows();
            }
          }
        },
        error => {
          console.log('error:', error);
        }
      );
    }
  }
}
