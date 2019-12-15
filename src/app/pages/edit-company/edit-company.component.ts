import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

export interface CompanyElement {
  companyCode: number;
  companyName: string;
  sectorId: number;
  ceo: number;
  directors: string;
  turnover: string;
  introduction: string;
}

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  company;
  sectors;
  constructor(
    public dialogRef: MatDialogRef<EditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyElement,
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
      this.company = this.data;
    }
    this.app.getAllSector().subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
          } else {
            this.sectors = res;
          }
        }
      },
      error => {
        console.log('error:', error);
      }
    );
  }

  saveCompany() {
    if (this.company.companyCode && this.company.companyName) {
      this.app.saveCompany(this.company).subscribe(
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
