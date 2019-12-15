import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from '../../component/calendar/calendar.component';
import { MatDialog } from '@angular/material';
import { AppService } from '../../service/app.service';
import { CompaniesChartComponent } from '../companies-chart/companies-chart.component';

export interface CompanyElement {
  companyCode: number;
  companyName: string;
  stockExchange: string;
}

@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.css']
})
export class CompareCompanyComponent implements OnInit {
  company = { companyCode: '', companyName: '', sectorId: null, stockExchange: '' };
  stockExchanges;
  companies;
  searchedCompanies = [];
  sectors;

  @ViewChild('selCalendar', { static: false }) selCalendar: CalendarComponent;
  constructor(public dialog: MatDialog, private app: AppService) { }

  ngOnInit() {
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

  searchCompany(): void {
    if (this.company.companyCode || this.company.sectorId) {
      this.app.searchCompany(this.company).subscribe(
        res => {
          if (res) {
            if (res.error || res.message) {
              console.log(res);
            } else {
              this.searchedCompanies = res;
              // if (this.searchedCompanies != null && this.searchedCompanies.length !== 0) {
              //   for (const company of this.searchedCompanies) {
              //     company.checked = false;
              //   }
              // }
            }
          }
        },
        error => {
          console.log('error:', error);
        }
      );
    }
  }

  getCheckedCompanies() {
    if (this.searchedCompanies == null || this.searchedCompanies.length === 0) {
      return null;
    }
    const checkedCompanies = [];
    for (const company of Object.values(this.searchedCompanies)) {
      if (company.checked) {
        checkedCompanies.push(company.companyCode);
      }
    }
    return checkedCompanies;
  }

  generateMap(): void {
    const checkedCompanies = this.getCheckedCompanies();
    const searchData = {
      companies: checkedCompanies,
      from: this.selCalendar.searchData.from,
      to: this.selCalendar.searchData.to,
    };
    const dialogRef = this.dialog.open(CompaniesChartComponent, {
      width: '800px',
      data: searchData,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
