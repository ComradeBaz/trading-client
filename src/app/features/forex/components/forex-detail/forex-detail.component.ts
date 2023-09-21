import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StocksTimeseriesService } from 'src/app/features/stocks/service/stocks-timeseries.service';
import { StocksService } from 'src/app/features/stocks/service/stocks.service';
import { ChartData } from 'src/app/shared-components/chart-base/models/chart-data';
import { UiManagerService } from 'src/app/shared-services/ui-manager.service';
import { ForexPairsItem } from '../../models/forex-pairs-item';
import { ForexListService } from '../../service/forex-list.service';

@Component({
  selector: 'app-forex-detail',
  templateUrl: './forex-detail.component.html',
  styleUrls: ['./forex-detail.component.scss']
})
export class ForexDetailComponent implements OnInit, OnDestroy {

  @Input() forexItem: ForexPairsItem | undefined;

  dataLoaded: boolean = false;

  interval: string = "1day";
  outputsize: string = "90";

  closeValuesData: any[] = [];
  openValuesData: any[] = [];
  lowValuesData: any[] = [];
  highValuesData: any[] = [];

  closeValueLabels: string[] = [];
  closeValueValues: number[] = [];

  forexPairDetailSubscription: Subscription | undefined;

  constructor(
    private stockTimeSeriesService: StocksTimeseriesService,
    private uiManagerService: UiManagerService,
    private forexService: ForexListService,
    private stocksService: StocksService

  ) { }

  ngOnInit(): void {
    this.forexPairDetailSubscription = this.forexService.forexPairDetailSubject
    .subscribe(data => {
      if (data !== undefined && data instanceof ForexPairsItem) {
        this.forexItem = data;
        this.getForexPairTimeSeriesBySymbol();
      }
    });
  }

  getForexPairTimeSeriesBySymbol() {
    if (this.forexItem !== undefined) {
      this.stockTimeSeriesService.onGetStocksTimeSeriesBySymbol(this.forexItem.symbol, this.interval, this.outputsize)
        .subscribe(data => {
          console.log(data);
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
    if (this.forexItem) {
      const chartData: ChartData = new ChartData(this.closeValueLabels, this.closeValueValues, this.forexItem?.symbol);
      this.uiManagerService.isUpdateForexPairClosing.next(chartData);
      this.dataLoaded = true;
    }
  }

  setInterval(interval: string) {
    this.interval = interval;
    this.getForexPairTimeSeriesBySymbol();
  }

  ngOnChanges() {
    this.getForexPairTimeSeriesBySymbol();
  }

  ngOnDestroy() {
    this.forexPairDetailSubscription?.unsubscribe();
  }

}
