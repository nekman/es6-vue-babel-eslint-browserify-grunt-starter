import StockQuoteService from '../../services/stockService';
import stockTemplate from './stockTemplate.html';

export default {
  template: stockTemplate,
  data: () => ({
    quotes: []
  }),

  created() {
    // '$' will make Vue not watch the property.
    this.$stockService = new StockQuoteService();
    this.interval = 2000;
  },

  attached() {
    this.timer = global.setInterval(() => {
      this.fetch();
    }, this.interval);

    this.fetch();
  },

  detached() {
    global.clearInterval(this.timer);
  },

  methods: {
    fetch() {
      this.$stockService.fetchQuotes().then(quotes => this.quotes = quotes);
    }
  }
};
