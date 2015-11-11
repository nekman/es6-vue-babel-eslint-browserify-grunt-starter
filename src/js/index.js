import Vue from 'vue';
import Config from 'config';
import HelloComponent from './components/hello';
import StockComponent from './components/stock';
import appRouter from './router';

// Create the app
const App = {
  data() {
    return {
      // livereload  = on, if development is true.
      development: Config.development,
      items: [1, 2, 3]
    };
  },
  el() {
    return '#app';
  }
};

// Setup router
appRouter.map({
  '*': {
    component: Vue.extend({
      template: '<h1>404</h1> <p>Not found :(</p>'
    })
  },
  '/': {
    component: HelloComponent
  },

  '/stocks': {
    component: StockComponent
  }
});

// Start the router
appRouter.start(App, App.el());
