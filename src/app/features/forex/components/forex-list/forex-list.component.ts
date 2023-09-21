import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ForexPairsItem } from '../../models/forex-pairs-item';

@Component({
  selector: 'app-forex-list',
  templateUrl: './forex-list.component.html',
  styleUrls: ['./forex-list.component.scss']
})
export class ForexListComponent implements OnInit {

  @Input() forexList: ForexPairsItem[] = [];
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
