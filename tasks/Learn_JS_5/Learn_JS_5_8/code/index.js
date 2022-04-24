function Cart() {
  this.products = ['Яйцо', 'Пакет', 'Молоко', 'Пиво'];

  this.cart = new Map();

  this.add = function (id, amount) {
    if (this.products.length <= amount) {
      if (this.cart.has(id)) {
      }
    }
  };

  this.getLog = function () {};
}
