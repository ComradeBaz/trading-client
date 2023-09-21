import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { StocksService } from 'src/app/features/stocks/service/stocks.service';
import { ForexPairsItem } from '../../models/forex-pairs-item';
import { ForexListService } from '../../service/forex-list.service';

@Component({
  selector: 'app-forex-list-item',
  templateUrl: './forex-list-item.component.html',
  styleUrls: ['./forex-list-item.component.scss']
})
export class ForexListItemComponent implements OnInit {

  @Input() forexItem: ForexPairsItem | undefined;

  httpError: HttpErrorResponse | undefined = undefined;


  constructor(
    public forexListService: ForexListService,
    public stocksService: StocksService
  ) { }

  ngOnInit(): void {
  }

  onSelectForexPair(forexPairsItem: ForexPairsItem) {
    this.getSelectedStock(forexPairsItem);
  }

  getSelectedStock(forexPairsItem: ForexPairsItem) {
    this.forexListService.getListForexParisBySymbol(forexPairsItem.symbol)
      .subscribe(data => {
        this.forexListService.forexPairDetailSubject.next(data[0]);
      },
        error => {
          this.httpError = error;
          console.log(this.httpError?.message);
        });
  }

}
