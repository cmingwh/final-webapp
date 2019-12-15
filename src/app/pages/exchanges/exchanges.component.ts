import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { EditExchangeComponent } from '../edit-exchange/edit-exchange.component';
import { ViewExchangeComponent } from '../view-exchange/view-exchange.component';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent implements OnInit {
  @ViewChild('exchangeTable', {static: false}) exchangeTable: MatTable<any>;
  isAdmin = false;

  exchanges = [
    {stockExchange: '12', brief: '1111111', contactAddress: 'test ceo', action: ''},
    {stockExchange: '33', brief: 'brief 333', contactAddress: 'test ceo', action: ''}
  ];

  // Exchanges = [];

  displayedColumns: string[] = ['stockExchange', 'brief', 'contactAddress', 'action'];
  
  constructor(public dialog: MatDialog, private app: AppService) { }

  ngOnInit() {
    this.app.getAllStockExchange().subscribe(
      res => {
        if (res) {
          if (res.error || res.message) {
            console.log(res);
          } else {
            this.exchanges = res;
            this.exchangeTable.renderRows();
          }
        }
      },
      error => {
        console.log('error:', error);
      }
    );
  }

  edit(element): void {
    const dialogRef = this.dialog.open(EditExchangeComponent, {
      width: '450px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  view(element): void {
    const dialogRef = this.dialog.open(ViewExchangeComponent, {
      width: '450px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  add(): void {
    const exchange = {stockExchange: '', brief: '', contactAddress: '', action: ''};
    this.edit(exchange);
  }
}
