const url = `https://query.yahooapis.com/v1/public/yql?q=
              select * from yahoo.finance.quotes where symbol in ("YHOO","AAPL","GOOG","MSFT")
              &env=http://datatables.org/alltables.env
              &format=json`;

export default class StockQuote {
  constructor(endpoint = url) {
    this.endpoint = endpoint;
  }

  fetchQuotes() {
    return global.fetch(this.endpoint)
                 .then(response => response.json())
                 .then(res => res.query.results.quote);
  }
}
