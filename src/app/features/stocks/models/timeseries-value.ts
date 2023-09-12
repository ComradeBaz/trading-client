export class TimeseriesValue {

    constructor(
        public datetime: Date,
        public close: number,
        public high: number,
        public low: number,
        public open: number,
        public volume: number
    ) {}
}