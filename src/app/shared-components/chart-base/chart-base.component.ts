import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { UiManagerService } from 'src/app/shared-services/ui-manager.service';

export interface ChartDataCoordinates {
  datasetIndex: number,
  index: number
}

@Component({
  selector: 'app-chart-base',
  templateUrl: './chart-base.component.html',
  styleUrls: ['./chart-base.component.scss']
})
export class ChartBaseComponent implements OnInit, OnDestroy {

  chart: Chart | undefined;

  @Input() chartData: number[] = [];
  @Input() chartLabels: string[] = [];
  @Input() chartLabel: string = "";
  @Input() backgroundColorProd: string = "#7D3854";
  backgroundColor: string = "#FDBB30";
  @Output() indexSelected = new EventEmitter<ChartDataCoordinates>();
  @Input() isShowTitle: boolean = false;

  isUpdateStocksClosingEvent: Subscription | undefined;
  isShowChart: boolean = false;

  constructor(
    private uiManagerService: UiManagerService
  ) { }

  ngOnInit() {
    this.createChart();
    this.isUpdateStocksClosingEvent = this.uiManagerService.isUpdateStocksClosing
      .subscribe(data => {
        if (data !== undefined && this.chart) {
          this.chart.data.datasets[0].data = [];
          this.chart.data.labels = data.labels;
          this.chart.data.datasets[0].label = data.companyName;
          for (let v of data.values) {
            this.chart.data.datasets[0].data.push(v);
          }
          this.chart?.update();
        }
      });
  }

  createChart() {
    this.chart = new Chart("baseChart", {
      type: "line",
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            //label: this.chartLabel,
            data: this.chartData,
            backgroundColor: this.backgroundColorProd
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              precision: 0
            }
          },
          y: {
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
    this.isShowChart = true;
  }

  getIndex(event: any) {
    if (this.chart) {
      const datasetIndex = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
      let myIndex = datasetIndex[0].index;
      let myDatasetIndex = datasetIndex[0].datasetIndex;
      this.indexSelected.emit({ index: myIndex, datasetIndex: myDatasetIndex });
    }
  }

  ngOnDestroy() {
    this.isUpdateStocksClosingEvent?.unsubscribe();
  }
}

