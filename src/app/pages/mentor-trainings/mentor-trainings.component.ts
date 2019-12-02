import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {WithdrawComponent} from '../withdraw/withdraw.component';

export interface TrainElement {
  tech: string;
  time: string;
  progress: number;
  traineeId: string;
  action: string;
}

const TRAIN_DATA: TrainElement[] = [
  {tech: 'SpringBoot', time: 'From 2019/11/12 12:00 AM to 2:00 PM', progress: 0.5, traineeId: 'test@test.com', action: ''},
  {tech: 'Cloud', time: 'From 2019/11/12 12:00 AM to 2:00 PM', progress: 0.75, traineeId: '222@ibm.com', action: ''}
];

@Component({
  selector: 'app-mentor-trainings',
  templateUrl: './mentor-trainings.component.html',
  styleUrls: ['./mentor-trainings.component.css']
})

export class MentorTrainingsComponent implements OnInit {

  displayedColumns: string[] = ['tech', 'time', 'progress', 'traineeId', 'action'];
  dataSource = TRAIN_DATA;
  completedColumns: string[] = ['tech', 'time', 'traineeId'];
  completedData = TRAIN_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(WithdrawComponent, {
      width: '450px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
