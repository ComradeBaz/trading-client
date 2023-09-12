import { TestBed } from '@angular/core/testing';

import { StocksTimeseriesService } from './stocks-timeseries.service';

describe('StocksTimeseriesService', () => {
  let service: StocksTimeseriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksTimeseriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
