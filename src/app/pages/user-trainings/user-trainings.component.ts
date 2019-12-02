import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../service/app.service';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['./user-trainings.component.css']
})
export class UserTrainingsComponent implements OnInit {

  currentColumns = ['skillName', 'time', 'progress', 'mentorName', 'action'];
  closedColumns = ['skillName', 'time', 'mentorName'];

  userName = null;
  currentList = [];
  closedList = [];
  @ViewChild('currentTable', {static: false}) currentTable: MatTable<any>;
  @ViewChild('closedTable', {static: false}) closedTable: MatTable<any>;

  constructor(private app: AppService) { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    if (this.userName) {
      this.app.getCurrentTraining(this.userName).subscribe(
        res => {
          if (res) {
            if (res.error || res.message) {
              console.log(res);
            } else {
              this.currentList = res;
              this.currentTable.renderRows();
            }
          }
        },
        error => {
          console.log('error:', error);
        }
      );

      this.app.getClosedTraining(this.userName).subscribe(
        res => {
          if (res) {
            if (res.error || res.message) {
              console.log(res);
            } else {
              this.closedList = res;
              this.closedTable.renderRows();
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
