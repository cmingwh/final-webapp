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
  company = {companyCode: '', companyName: '', stockExchange: '', companies: []};
  
  @ViewChild('selCalendar', { static: false }) selCalendar: CalendarComponent;
  constructor(public dialog: MatDialog, private app: AppService) { }

  ngOnInit() {
  }

  generateMap(): void {
    const searchData = {
      companies: this.company.companies,
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
