import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StocksService } from 'src/app/features/stocks/service/stocks.service';
import { ForexPairsItem } from '../../models/forex-pairs-item';
import { ForexListService } from '../../service/forex-list.service';

@Component({
  selector: 'app-forex-wrapper',
  templateUrl: './forex-wrapper.component.html',
  styleUrls: ['./forex-wrapper.component.scss']
})
export class ForexWrapperComponent implements OnInit, OnDestroy {

  isFetching: boolean = false;
  httpError: HttpErrorResponse | undefined = undefined;
  forexPairsList: ForexPairsItem[] = [];
  pagedForexPairsListToDisplay: ForexPairsItem[] = [];
  currentPage: number = 1;
  forexPairsPerPage: number = 20;
  currentForexPairsItem: ForexPairsItem | undefined;

  forexPairDetailSubscription: Subscription | undefined;

  constructor(
    public forexListService: ForexListService,
    public stocksService: StocksService
  ) { }

  ngOnInit(): void {
    //this.onListForexPairs();
    //this.onListForexPairsBySymbol("AED/ARS");
    this.onListForexPairsByCurrencyBase("USD");
    //this.onGetExchangeRateByPair("EUR/USD");
    this.forexPairDetailSubscription = this.forexListService.forexPairDetailSubject
      .subscribe(data => {
        if (data !== undefined) {
          this.currentForexPairsItem = data;
        }
      });
  }

  onListForexPairs() {
    this.resetLists();
    this.isFetching = true;
    this.forexListService.getListForexParis()
      .subscribe(data => {
        this.isFetching = false;
        this.forexPairsList = data;
        this.getPagedListOfForexPairs();
        this.currentForexPairsItem = this.forexPairsList[0];
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

  onListForexPairsBySymbol(symbol: string) {
    this.resetLists();
    this.isFetching = true;
    this.forexListService.getListForexParisBySymbol(symbol)
      .subscribe(data => {
        this.isFetching = false;
        this.forexPairsList = data;
        this.getPagedListOfForexPairs();
        this.currentForexPairsItem = this.forexPairsList[0];
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

  onListForexPairsByCurrencyBase(currencyBase: string) {
    this.resetLists();
    this.isFetching = true;
    this.forexListService.getListForexParisByCurrencyBase(currencyBase)
      .subscribe(data => {
        this.isFetching = false;
        this.forexPairsList = data;
        this.getPagedListOfForexPairs();
        this.currentForexPairsItem = this.forexPairsList[0];
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

  onGetExchangeRateByPair(symbol: string) {
    this.resetLists();
    this.isFetching = true;
    this.forexListService.getExchangeRateByPair(symbol)
      .subscribe(data => {
        this.isFetching = false;
        this.forexPairsList = data;
        this.getPagedListOfForexPairs();
        this.currentForexPairsItem = this.forexPairsList[0];
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

  getPagedListOfForexPairs() {
    if (this.forexPairsList.length > this.forexPairsPerPage) {
      const startIndex = (this.currentPage - 1) * this.forexPairsPerPage;
      const endIndex = this.currentPage * this.forexPairsPerPage;
      this.pagedForexPairsListToDisplay = this.forexPairsList.slice(startIndex, endIndex);
    } else {
      this.pagedForexPairsListToDisplay = this.forexPairsList;
    }
  }

  onPreviousPageEvent(event: boolean) {
    if (event) {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.getPagedListOfForexPairs();
      }
    }
  }

  onNextPageEvent(event: boolean) {
    if (event) {
      if (this.forexPairsList) {
        const lastPage: number = this.forexPairsList.length / this.forexPairsPerPage;
        if (this.currentPage < lastPage) {
          this.currentPage += 1;
          this.getPagedListOfForexPairs();
        }
      }
    }
  }

  resetLists() {
    this.forexPairsList = [];
    this.pagedForexPairsListToDisplay = [];
  }

  ngOnDestroy() {
    this.forexPairDetailSubscription?.unsubscribe();
  }

}
