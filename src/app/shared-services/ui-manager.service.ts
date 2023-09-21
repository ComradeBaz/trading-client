import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartData } from '../shared-components/chart-base/models/chart-data';

@Injectable({
  providedIn: 'root'
})
export class UiManagerService {

  public isUpdateStocksClosing = new BehaviorSubject<ChartData | undefined>(undefined);
  public isUpdateForexPairClosing = new BehaviorSubject<ChartData | undefined>(undefined);

  constructor() { }
}
