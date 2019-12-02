import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface TrainElement {
  tech: string;
  time: string;
  progress: number;
  traineeId: string;
  action: string;
}

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})

export class WithdrawComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WithdrawComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainElement) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
