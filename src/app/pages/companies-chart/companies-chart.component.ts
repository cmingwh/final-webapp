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

const chartData = {
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

@Component({
  selector: 'app-companies-chart',
  templateUrl: './companies-chart.component.html',
  styleUrls: ['./companies-chart.component.css']
})
export class CompaniesChartComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  dataSource;
  chartConfig;

  constructor(
    public dialogRef: MatDialogRef<CompaniesChartComponent>,
    @Inject(MAT_DIALOG_DATA) public searchData: SearchElement,
    private app: AppService, private auth: AuthService,
    private router: Router) {
    this.chartConfig = {
      width: '700',
      height: '400',
      type: 'msspline',
      dataFormat: 'json',
    };

    if (this.searchData.from && this.searchData.to && this.searchData.companies.length > 0) {
      this.app.searchCompaniesStocePrice(this.searchData).subscribe(
        res => {
          if (res) {
            console.log(res);
            this.dataSource = this.generateChartData(res);
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
    for (const item of origin) {
      if (firstCompany === item.companyCode) {
        chartData.categories[0].category.push(item.happenTime);
      }
      line.data.push({value: item.price});
      if (lastCompany !== item.companyCode) {
        chartData.dataset.push(line);
        lastCompany = item.companyCode;
        line = {seriesname: lastCompany, data: []};
      }
    }
    return chartData;
  }
}
