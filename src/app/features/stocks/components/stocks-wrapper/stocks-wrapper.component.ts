import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockItem } from '../../models/stock-item';
import { StocksService } from '../../service/stocks.service';

@Component({
  selector: 'app-stocks-wrapper',
  templateUrl: './stocks-wrapper.component.html',
  styleUrls: ['./stocks-wrapper.component.scss']
})
export class StocksWrapperComponent implements OnInit, OnDestroy {

  isFetching: boolean = false;
  httpError: HttpErrorResponse | undefined = undefined;
  stocksList: StockItem[] = [];
  pagedStocksListToDisplay: StockItem[] = [];
  currentPage: number = 1;
  stocksPerPage: number = 20;
  currentStockItem: StockItem | undefined;

  stockDetailSubscription: Subscription | undefined;

  constructor(public stocksService: StocksService) { }

  ngOnInit(): void {
    // Get the list of stocks when the component loads
    this.onListStocksBySymbol("AMZN");
    // Set the selected stock item when the user chooses from the list of stocks
    this.stockDetailSubscription = this.stocksService.stockDetailSubject
      .subscribe(data => {
        if (data !== undefined) {
          this.currentStockItem = data;
        }
      });
  }

  getPagedListOfStocks() {
    if (this.stocksList.length > this.stocksPerPage) {
      const startIndex = (this.currentPage - 1) * this.stocksPerPage;
      const endIndex = this.currentPage * this.stocksPerPage;
      this.pagedStocksListToDisplay = this.stocksList.slice(startIndex, endIndex);
    } else {
      this.pagedStocksListToDisplay = this.stocksList;
    }
  }

  onListStocks() {
    this.resetLists();
    this.isFetching = true;
    this.stocksService.getListStocks()
      .subscribe(data => {
        this.isFetching = false;
        this.stocksList = data;
        this.getPagedListOfStocks();
        this.currentStockItem = this.stocksList[0];
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

  onListStocksBySymbol(symbol: string) {
    this.resetLists();
    this.isFetching = true;
    this.stocksService.getListStocksBySymbol(symbol)
      .subscribe(data => {
        this.isFetching = false;
        this.stocksList = data;
        this.getPagedListOfStocks();
        this.currentStockItem = this.stocksList[0];
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

  onListStocksByExchange(exchange: string) {
    this.resetLists();
    this.isFetching = true;
    this.stocksService.getListStocksByExchange(exchange)
      .subscribe(data => {
        this.stocksList = data;
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

  onListStocksByCountry(country: string) {
    this.resetLists();
    this.isFetching = true;
    this.stocksService.getListStocksByCountry(country)
      .subscribe(data => {
        this.stocksList = data;
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

  onPreviousPageEvent(event: boolean) {
    if (event) {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.getPagedListOfStocks();
      }
    }
  }

  onNextPageEvent(event: boolean) {
    if (event) {
      if (this.stocksList) {
        const lastPage: number = this.stocksList.length / this.stocksPerPage;
        if (this.currentPage < lastPage) {
          this.currentPage += 1;
          this.getPagedListOfStocks();
        }
      }

    }
  }

  resetLists() {
    this.stocksList = [];
    this.pagedStocksListToDisplay = [];
  }

  ngOnDestroy() {
    this.stockDetailSubscription?.unsubscribe();
  }
}
