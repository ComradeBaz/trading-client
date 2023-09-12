export class TimeSeriesMetaData {

    constructor(
        public currency: string,
        public exchange: string,
        public exchange_timezone: string,
        public interval: string,
        public mic_code: string,
        public symbol: string,
        public type: string
    ) {}
}