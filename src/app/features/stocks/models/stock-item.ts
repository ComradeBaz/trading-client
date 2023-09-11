export class StockItem {

    constructor(
        public symbol: string,
        public name: string,
        public currency: string,
        public exchange: string,
        public mic_code: string,
        public country: string,
        public type: string
    ) {}
}