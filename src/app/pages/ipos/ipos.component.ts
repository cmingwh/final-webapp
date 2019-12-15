import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { EditIpoComponent } from '../edit-ipo/edit-ipo.component';
import { ViewIpoComponent } from '../view-ipo/view-ipo.component';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-ipos',
  templateUrl: './ipos.component.html',
  styleUrls: ['./ipos.component.css']
})
export class IposComponent implements OnInit {
  @ViewChild('ipoTable', {static: false}) ipoTable: MatTable<any>;
  isAdmin = false;

  ipos = [
    {companyCode: '', stockExchange: '12', price: 3, openDate: '2018-11-11', action: ''},
    {companyCode: '', stockExchange: '33', price: 2, openDate: '20189-12-12', action: ''}
  ];

  // Exchanges = [];

  displayedColumns: string[] = ['companyCode', 'stockExchange', 'price', 'openDate', 'action'];
  
  constructor(public dialog: MatDialog, private app: AppService) { }

  ngOnInit() {
    this.app.getAllIpo().subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
          } else {
            this.ipos = res;
            this.ipoTable.renderRows();
          }
        }
      },
      error => {
        console.log('error:', error);
      }
    );
  }

  edit(element): void {
    const dialogRef = this.dialog.open(EditIpoComponent, {
      width: '450px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  view(element): void {
    const dialogRef = this.dialog.open(ViewIpoComponent, {
      width: '450px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  add(): void {
    const ipo = {companyCode: '', stockExchange: '', price: 0, openDate: '', action: ''};
    this.edit(ipo);
  }

}
