import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StockItem } from '../../models/stock-item';
import { StocksService } from '../../service/stocks.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {

 // @Input() stocksList: StockItem[] = [];
  @Output() nextPageEvent = new EventEmitter<boolean>();
  @Output() previousPageEvent = new EventEmitter<boolean>();

  currentStockItem: StockItem | undefined;
  isFetching: boolean = false;
  httpError: HttpErrorResponse | undefined = undefined;
  stocksList: StockItem[] = [];
  pagedStocksListToDisplay: StockItem[] = [];
  currentPage: number = 1;
  stocksPerPage: number = 20;

  constructor(public stocksService: StocksService) { }

  ngOnInit(): void {
    this.onListStocksByExchange("NASDAQ");
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
        this.stocksService.stockDetailSubject.next(this.currentStockItem);
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
        this.isFetching = false;
        this.stocksList = data;
        this.getPagedListOfStocks();
        this.currentStockItem = this.stocksList[0];
        this.stocksService.stockDetailSubject.next(this.currentStockItem);
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
        this.getPagedListOfStocks();
        this.currentStockItem = this.stocksList[0];
        this.stocksService.stockDetailSubject.next(this.currentStockItem);
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

  onPreviousPage() {
    this.previousPageEvent.emit(true);
  }

  onNextPage() {
    this.nextPageEvent.emit(true);
  }

}
