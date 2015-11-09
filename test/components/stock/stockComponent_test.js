import sut from './../../../src/js/components/stock';

const fakeStockService = {
  fetchQuotes() {
    return {
      then() {}
    }
  }
};

describe('StockComponent', () => {
  it('calls stockservice when attached', () => {
    // Arrange
    spyOn(fakeStockService, 'fetchQuotes').and.callThrough();
    sut.fetch = sut.methods.fetch;
    sut.$stockService = fakeStockService;

    // Act
    sut.attached();

    // Assert
    expect(sut.$stockService.fetchQuotes).toHaveBeenCalled();
  });
});
