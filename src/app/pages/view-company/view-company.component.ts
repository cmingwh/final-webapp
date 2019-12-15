import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

export interface CompanyElement {
  companyCode: number;
  companyName: string;
  ceo: number;
  directors: string;
  turnover: string;
  introduction: string;
}

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})

export class ViewCompanyComponent implements OnInit {
  company: CompanyElement;
  constructor(
    public dialogRef: MatDialogRef<ViewCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyElement,
    private app: AppService, private auth: AuthService,
    private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.company = this.data; //{ companyCode: '', companyName: '', ceo: '', directors: '', turnover: '', introduction: '' };
  }

}
