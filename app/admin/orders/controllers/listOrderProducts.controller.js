angular.module('book-store.admin')
  .controller('ListOrderProductsCtrl', ['BookService', 'AuthService', '$state', '$stateParams', function(BookService, AuthService, $state, $stateParams) {
    var vm = this;

    BookService
      .getOrderProductsByOrderId($stateParams.id)
      .then(function(res) {
        vm.orderProducts = [];
        for (var i = 0; i < res.rows.length; i++) {
          let product = {};

          Object.assign(product, res.rows.item(i));

          vm.orderProducts.push(product);

          BookService
            .getById(res.rows.item(i).book_id)
            .then(function(res) {
              product.book = res.rows.item(0);
            })
          
        }

        vm.totalPrice = 0;

        for (var i = 0; i < vm.orderProducts.length; i++) {
          vm.totalPrice += +vm.orderProducts[i].price 
        }

      });
  }]);