export class ForexPairsItem {

    constructor(
        public symbol: string,
        public currency_group: string,
        public currency_base: string,
        public currency_quote: string
    ) {}
}