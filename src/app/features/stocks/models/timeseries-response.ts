import { TimeSeriesMetaData } from "./timeseries-meta-data";
import { TimeseriesValue } from "./timeseries-value";

export interface StockDataPoint {
    string: number
}

export class TimeseriesResponse {

    constructor(
        public meta: TimeSeriesMetaData,
        public values: TimeseriesValue[],
        public closeValuesMap: StockDataPoint,
        public openValuesMap: StockDataPoint,
        public lowValuesMap: StockDataPoint,
        public highValuesMap: StockDataPoint
    ) {}
}