import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

export interface SearchElement {
  companies: [string];
  from: string;
  to: string;
}

@Component({
  selector: 'app-companies-chart',
  templateUrl: './companies-chart.component.html',
  styleUrls: ['./companies-chart.component.css']
})
export class CompaniesChartComponent implements OnInit {
  dataSource;
  chartConfig = {
    width: '700',
    height: '400',
    type: 'msspline',
    dataFormat: 'json',
  };
  chartData = {
    chart: {
      caption: 'Compare Companies : Company vs Resolved',
      yaxisname: '$ Price per Share',
      // subcaption: 'Last  week',
      numdivlines: '3',
      showvalues: '0',
      legenditemfontsize: '15',
      legenditemfontbold: '1',
      plottooltext: '$<b>$dataValue</b> per Share of $seriesName on $label',
      theme: 'fusion'
    },
    categories: [
      {
        category: []
      }
    ],
    dataset: []
  };

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<CompaniesChartComponent>,
    @Inject(MAT_DIALOG_DATA) public searchData: SearchElement,
    private app: AppService, private auth: AuthService,
    private router: Router) {

    if (this.searchData.from && this.searchData.to && this.searchData.companies.length > 0) {
      this.app.searchCompaniesStocePrice(this.searchData).subscribe(
        res => {
          if (res && res.length > 0) {
            console.log(res);
            this.dataSource = this.generateChartData(res);
          } else {
            alert('No data found. Please try change your conditions.');
          }
        },
        error => {
          console.log('error:', error);
        }
      );
    }
  }

  generateChartData(origin) {
    const firstCompany = origin[0].companyCode;
    let lastCompany = origin[0].companyCode;
    let line = {seriesname: lastCompany, data: []};
    this.chartData.dataset.push(line);
    for (const item of origin) {
      if (firstCompany === item.companyCode) {
        this.chartData.categories[0].category.push(item.happenTime);
      }
      line.data.push({value: item.price});
      if (lastCompany !== item.companyCode) {
        lastCompany = item.companyCode;
        line = {seriesname: lastCompany, data: []};
        this.chartData.dataset.push(line);
      }
    }
    return this.chartData;
  }
}
