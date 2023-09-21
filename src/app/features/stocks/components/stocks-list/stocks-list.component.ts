import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StockItem } from '../../models/stock-item';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {

  @Input() stocksList: StockItem[] = [];
  @Output() nextPageEvent = new EventEmitter<boolean>();
  @Output() previousPageEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onPreviousPage() {
    this.previousPageEvent.emit(true);
  }

  onNextPage() {
    this.nextPageEvent.emit(true);
  }

}
