import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StockItem } from '../../models/stock-item';
import { StocksTimeseriesService } from '../../service/stocks-timeseries.service';
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

  interval: string = "1day";
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
    console.log("detail");
    this.stockDetailSubscription = this.stocksService.stockDetailSubject
      .subscribe(data => {
        console.log(data);
        if (data !== undefined) {
          console.log(data);
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

          this.getChartData();
        });
    }
  }

  getChartData() {
    this.dataLoaded = false;
    this.closeValueLabels = [];
    this.closeValueValues = [];
    for (let entry of this.closeValuesData) {
      let label = "";
      if (this.interval === "1min"
        || this.interval == "5min"
        || this.interval == "15min"
        || this.interval == "30min"
        || this.interval == "45min"
        || this.interval == "1h"
        || this.interval == "2h"
        || this.interval == "4h"
      ) {
        label = entry[0].split("T")[1].split(".")[0];
      } else {
        label = entry[0].split("T")[0];
      }
      this.closeValueLabels.push(label);
      this.closeValueValues.push(entry[1]);
    }
    if (this.stockItem) {
      const chartData: ChartData = new ChartData(this.closeValueLabels, this.closeValueValues, this.stockItem?.name);
      this.uiManagerService.isUpdateStocksClosing.next(chartData);
      this.dataLoaded = true;
    }
  }

  setInterval(interval: string) {
    this.interval = interval;
    this.getStocksTimeSeriesBySymbol();
  }

  ngOnChanges() {
    this.getStocksTimeSeriesBySymbol();
  }

  ngOnDestroy(): void {
    this.stockDetailSubscription?.unsubscribe();
  }

}