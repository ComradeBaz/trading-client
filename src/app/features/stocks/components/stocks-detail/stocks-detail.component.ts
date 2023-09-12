import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StockItem } from '../../models/stock-item';
import { StocksTimeseriesService } from '../../service/stocks-timeseries.service';
import { StockDataPoint } from '../../models/timeseries-response';
import { ChartData } from 'src/app/shared-components/chart-base/models/chart-data';
import { UiManagerService } from 'src/app/shared-services/ui-manager.service';
import { Subscription } from 'rxjs';
import { StocksService } from '../../service/stocks.service';

@Component({
  selector: 'app-stocks-detail',
  templateUrl: './stocks-detail.component.html',
  styleUrls: ['./stocks-detail.component.scss']
})
export class StocksDetailComponent implements OnInit, OnDestroy {

  @Input() stockItem: StockItem | undefined;

  stockDetailSubscription: Subscription | undefined;

  dataLoaded: boolean = false;

  interval: string = "1min";
  outputsize: string = "30";

  closeValuesData: any[] = [];
  openValuesData: any[] = [];
  lowValuesData: any[] = [];
  highValuesData: any[] = [];

  closeValueLabels: string[] = [];
  closeValueValues: number[] = [];

  constructor(
    private stockTimeSeriesService: StocksTimeseriesService,
    private uiManagerService: UiManagerService,
    private stocksService: StocksService
  ) { }

  ngOnInit(): void {
    this.stockDetailSubscription = this.stocksService.stockDetailSubject
      .subscribe(data => {
        if (data !== undefined) {
          this.stockItem = data;
          this.getStocksTimeSeriesBySymbol();
        }
      });
  }

  getStocksTimeSeriesBySymbol() {
    if (this.stockItem !== undefined) {
      this.stockTimeSeriesService.onGetStocksTimeSeriesBySymbol(this.stockItem.symbol, this.interval, this.outputsize)
        .subscribe(data => {
          this.openValuesData = Object.entries(data.openValuesMap);
          this.closeValuesData = Object.entries(data.closeValuesMap);
          this.lowValuesData = Object.entries(data.lowValuesMap);
          this.highValuesData = Object.entries(data.highValuesMap);

          console.log(this.closeValuesData);
          this.getChartData();
        });
    }

  }

  getChartData() {
    this.dataLoaded = false;
    this.closeValueLabels = [];
    this.closeValueValues = [];
    console.log(this.closeValuesData);
    for (let entry of this.closeValuesData) {
      let label = entry[0].split("T")[1].split(".")[0];
      this.closeValueLabels.push(label);
      this.closeValueValues.push(entry[1]);
    }
    console.log(this.closeValueLabels);
    console.log(this.closeValueValues);
    const chartData: ChartData = new ChartData(this.closeValueLabels, this.closeValueValues);
    this.uiManagerService.isUpdateStocksClosing.next(chartData);
    this.dataLoaded = true;
  }

  ngOnChanges() {
    this.getStocksTimeSeriesBySymbol();
  }

  ngOnDestroy(): void {
    this.stockDetailSubscription?.unsubscribe();
  }

}

/**
 * public close: number,
        public datetime: Date,
        public high: number,
        public low: number,
        public open: number,
        public volume: number

        metaData
        public currency: string,
        public exchange: string,
        public exchange_timezone: string,
        public interval: string,
        public mic_code: string,
        public symbol: string,
        public type: string
 */
