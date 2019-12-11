import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { ViewCompanyComponent } from '../view-company/view-company.component';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  // @ViewChild('selSkills', { static: false }) selSkills: MentorSkillsComponent;
  // @ViewChild('selCalendar', { static: false }) selCalendar: CalendarComponent;
  @ViewChild('companyTable', { static: false }) companyTable: MatTable<any>;
  isAdmin = false;

  // companies = [
  //   {
  //     companyName: 'IBM', companyCode: '0011223', sectorName: 'Computer',
  //     turnover: 'turnover 111', ceo: 'test ceo', directors: '', action: ''
  //   },
  //   {
  //     companyName: 'ADOBE', companyCode: '0011223', sectorName: 'Computer',
  //     turnover: 'turnover 333', ceo: 'test ceo', directors: '', action: ''
  //   }
  // ];

  companies = [];

  displayedColumns: string[] = ['companyName', 'companyCode', 'sectorName', 'turnover', 'ceo', 'directors', 'action'];

  constructor(public dialog: MatDialog, private app: AppService) { }

  ngOnInit() {
    this.app.getAllCompany().subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
          } else {
            this.companies = res;
            this.companyTable.renderRows();
          }
        }
      },
      error => {
        console.log('error:', error);
      }
    );
  }

  edit(element): void {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      width: '450px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  view(element): void {
    const dialogRef = this.dialog.open(ViewCompanyComponent, {
      width: '450px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
