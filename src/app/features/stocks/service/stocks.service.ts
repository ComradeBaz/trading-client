import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockItem } from '../models/stock-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { ForexPairsItem } from '../../forex/models/forex-pairs-item';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private BASE_URL: string = "http://localhost:8081/rest/v1/stocks/";

  public stockDetailSubject = new BehaviorSubject<StockItem | ForexPairsItem | undefined>(undefined);

  constructor(private http: HttpClient) { }

  getListStocks(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(this.BASE_URL + "listStocks");
  }

  getListStocksBySymbol(symbol: string): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(this.BASE_URL + "listStocksBySymbol",
      {
        params: { "symbol": symbol }
      });
  }

  getListStocksByExchange(exchange: string): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(this.BASE_URL + "listStocksByExchange",
      {
        params: { "exchange": exchange }
      });
  }

  getListStocksByCountry(country: string): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(this.BASE_URL + "listStocksByCountry",
      {
        params: { "country": country }
      });
  }

  getStockBySymbolExchangeCountry(stockItem: StockItem) {
    return this.http.get<StockItem>(this.BASE_URL + "listStocksBySymbolExchangeCountry",
      {
        params: {
          "symbol": stockItem.symbol,
          "exchange": stockItem.exchange,
          "country": stockItem.country
        }
      });
  }
}
