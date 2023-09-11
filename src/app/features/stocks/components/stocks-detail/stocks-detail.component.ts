import { Component, Input, OnInit } from '@angular/core';
import { StockItem } from '../../models/stock-item';

@Component({
  selector: 'app-stocks-detail',
  templateUrl: './stocks-detail.component.html',
  styleUrls: ['./stocks-detail.component.scss']
})
export class StocksDetailComponent implements OnInit {

  @Input() stockItem: StockItem | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
