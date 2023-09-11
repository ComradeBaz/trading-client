import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { StockItem } from '../../models/stock-item';
import { StocksService } from '../../service/stocks.service';

@Component({
  selector: 'app-stocks-list-item',
  templateUrl: './stocks-list-item.component.html',
  styleUrls: ['./stocks-list-item.component.scss']
})
export class StocksListItemComponent implements OnInit {

  @Input() stockItem: StockItem | undefined;

  isFetching: boolean = false;
  httpError: HttpErrorResponse | undefined = undefined;

  constructor(
    public stocksService: StocksService
  ) { }

  ngOnInit(): void {
  }

  onSelectStock(stockItem: StockItem) {
    //this.stocksService.stockDetailSubject.next(stockItem);
    this.getSelectedStock(stockItem);
  }

  getSelectedStock(stockItem: StockItem) {
    //this.stocksList = [];
    //this.isFetching = true;
    this.stocksService.getStockBySymbolExchangeCountry(stockItem)
      .subscribe(data => {
        //this.stockItem = data;
        this.stocksService.stockDetailSubject.next(data);
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

}
