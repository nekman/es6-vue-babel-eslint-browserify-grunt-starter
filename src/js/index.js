import HelloComponent from './components/hello';
import StockComponent from './components/stock';
import appRouter from './router';

// Create the app
const App = {
  el() {
    return '#app';
  }
};

// Setup router
appRouter.map({
  '/': {
    component: HelloComponent
  },

  '/stocks': {
    component: StockComponent
  }
});

// Start the router
appRouter.start(App, App.el());
