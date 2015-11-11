import StockComponent from './../../../src/js/components/stock';
import Vue from 'vue';

describe('StockComponent', () => {
  let sut = null;

  beforeEach(() => {
    sut = Vue.extend(StockComponent);
  });

  it('calls stockservice when attached', () => {
    expect(sut).toBeDefined();
  });
});
