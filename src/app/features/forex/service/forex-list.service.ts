import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ForexPairsItem } from '../models/forex-pairs-item';

@Injectable({
  providedIn: 'root'
})
export class ForexListService {

  private BASE_URL: string = "http://localhost:8081/rest/v1/forexPairsList/";

  public forexPairDetailSubject = new BehaviorSubject<ForexPairsItem | undefined>(undefined);

  constructor(private http: HttpClient) { }

  getListForexParis(): Observable<ForexPairsItem[]> {
    return this.http.get<ForexPairsItem[]>(this.BASE_URL + "listForexPairs");
  }

  getListForexParisBySymbol(symbol: string): Observable<ForexPairsItem[]> {
    return this.http.get<ForexPairsItem[]>(this.BASE_URL + "listForexPairsBySymbol",
      {
        params: { "symbol": symbol }
      });
  }

  getListForexParisByCurrencyBase(currencyBase: string): Observable<ForexPairsItem[]> {
    return this.http.get<ForexPairsItem[]>(this.BASE_URL + "listForexPairsByCurrencyBase",
      {
        params: { "currencyBase": currencyBase }
      });
  }

  getExchangeRateByPair(symbol: string): Observable<ForexPairsItem[]> {
    return this.http.get<ForexPairsItem[]>(this.BASE_URL + "getExchangeRateByPair",
      {
        params: { "symbol": symbol }
      });
  }

}
