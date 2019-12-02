import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

export interface TrainElement {
  calendarId: number;
  endTime: string;
  skillId: number;
  startDate: string;
  startTime: string;
  status: string;
  userName: string;
}

@Component({
  selector: 'app-propose',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.css']
})
export class ProposeComponent implements OnInit {
  propose = {mentorName: '', applyReason: '', calendarId: null, skillId: null, userName: ''};

  constructor(
    public dialogRef: MatDialogRef<ProposeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainElement,
    private app: AppService, private auth: AuthService,
    private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.auth.isLogin()) {
      this.propose.userName = localStorage.getItem('userName');
      this.propose.mentorName = this.data.userName;
      this.propose.calendarId = this.data.calendarId;
      this.propose.skillId = this.data.skillId;
    } else {
      this.dialogRef.close();
      this.router.navigate(['login']);
    }
  }

  sendPropose() {
    if (this.propose.userName && this.propose.applyReason) {
      this.app.sendPropose(this.propose).subscribe(
        res => {
          if (res) {
            console.log(res);
            this.router.navigate(['training']);
          }
        },
        error => {
          console.log('error:', error);
        }
      );
    }
  }

}
