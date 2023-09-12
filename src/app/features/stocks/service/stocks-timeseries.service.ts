import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeseriesResponse } from '../models/timeseries-response';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksTimeseriesService {

  private BASE_URL: string = "http://localhost:8080/rest/v1/timeseries/";

  constructor(private http: HttpClient) { }

  onGetStocksTimeSeriesBySymbol(symbol: string, interval: string, outputsize: string): Observable<TimeseriesResponse> {
    return this.http.get<TimeseriesResponse>(this.BASE_URL + "listTimeseriesBySymbol",
      {
        params: {
          "symbol": symbol,
          "interval": interval,
          "outputsize": outputsize
        }
      });
  }
}
