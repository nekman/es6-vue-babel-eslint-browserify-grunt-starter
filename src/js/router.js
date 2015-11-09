import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './index';
import HelloComponent from './components/hello';
import StockComponent from './components/stock';

Vue.use(VueRouter);

const router = new VueRouter();
router.map({
  '/': {
    component: HelloComponent
  },

  '/stocks': {
    component: StockComponent
  }
});

router.start(App, '#app');

export default router;
