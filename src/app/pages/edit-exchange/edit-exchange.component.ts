import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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
  selector: 'app-edit-exchange',
  templateUrl: './edit-exchange.component.html',
  styleUrls: ['./edit-exchange.component.css']
})
export class EditExchangeComponent implements OnInit {
  exchange; // = {stockExchange: '', brief: '', contactAddress: '', remark: ''};

  constructor(
    public dialogRef: MatDialogRef<EditExchangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExchangeElement,
    private app: AppService, private auth: AuthService,
    private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (!this.auth.isLogin()) {
      this.dialogRef.close();
      this.router.navigate(['login']);
    } else {
      this.exchange = this.data;
    }
  }

  saveExchange() {
    if (this.exchange.stockExchange) {
      this.app.saveStockExchange(this.exchange).subscribe(
        res => {
          if (res) {
            console.log(res);
            this.router.navigate(['admin']);
          }
        },
        error => {
          console.log('error:', error);
        }
      );
    }
  }

}
