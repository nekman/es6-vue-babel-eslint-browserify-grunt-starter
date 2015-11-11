import StockQuoteService from '../../services/stockService';
import stockTemplate from './stockTemplate.html';
import appRouter from '../../router';

export default {
  template: stockTemplate,
  data: () => ({
    quotes: [],
    interval: 2000
  }),

  created() {
    // '$' will make Vue not watch the property.
    this.$stockService = new StockQuoteService();
    this.$appRouter = appRouter;
  },

  attached() {
    this.startPollStocks();
  },

  detached() {
    global.clearInterval(this.timer);
  },

  methods: {
    startPollStocks() {
      console.log(`Start poll for stock quotes each: ${this.interval}ms`);
      this.timer = global.setInterval(() => {
        this.fetch();
      }, this.interval);

      this.fetch();
    },

    fetch() {
      this.$stockService.fetchQuotes().then(quotes => this.quotes = quotes);
    },

    intervalChanged() {
      global.clearInterval(this.timer);
      this.startPollStocks();
    },

    routeToHello() {
      this.$appRouter.go('/');
    }
  }
};
