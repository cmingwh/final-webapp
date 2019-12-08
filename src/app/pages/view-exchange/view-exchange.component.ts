import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

export interface ExchangeElement {
  stockExchange: number;
  brief: string;
  contactAddress: number;
  remark: string;
}

@Component({
  selector: 'app-view-exchange',
  templateUrl: './view-exchange.component.html',
  styleUrls: ['./view-exchange.component.css']
})
export class ViewExchangeComponent implements OnInit {
  exchange: {};
  constructor(
    public dialogRef: MatDialogRef<ViewExchangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExchangeElement,
    private app: AppService, private auth: AuthService,
    private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.exchange = { exchangeCode: '', exchangeName: '', ceo: '', directors: '', turnover: '', introduction: '' };
  }

}
