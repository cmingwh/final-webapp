import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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
  selector: 'app-edit-ipo',
  templateUrl: './edit-ipo.component.html',
  styleUrls: ['./edit-ipo.component.css']
})
export class EditIpoComponent implements OnInit {
  ipo; // = {companyCode: '', stockExchange: '', price: '', openDate: '', remark: ''};
  companies;
  stockExchanges;

  constructor(
    public dialogRef: MatDialogRef<EditIpoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IpoElement,
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
      this.ipo = this.data;
    }
    this.app.getAllCompany().subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
          } else {
            this.companies = res;
          }
        }
      },
      error => {
        console.log('error:', error);
      }
    );
    this.app.getAllStockExchange().subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
          } else {
            this.stockExchanges = res;
          }
        }
      },
      error => {
        console.log('error:', error);
      }
    );
  }

  saveIpo() {
    if (this.ipo.companyCode && this.ipo.stockExchange && this.ipo.price && this.ipo.openDate) {
      this.app.saveIpo(this.ipo).subscribe(
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
