import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

export interface IpoElement {
  companyCode: number;
  stockExchange: string;
  price: number;
  openDate: string;
  remark: string;
}

@Component({
  selector: 'app-view-ipo',
  templateUrl: './view-ipo.component.html',
  styleUrls: ['./view-ipo.component.css']
})
export class ViewIpoComponent implements OnInit {
  ipo: {};
  constructor(
    public dialogRef: MatDialogRef<ViewIpoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IpoElement,
    private app: AppService, private auth: AuthService,
    private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ipo = { ipoCode: '', ipoName: '', ceo: '', directors: '', turnover: '', introduction: '' };
  }
}
