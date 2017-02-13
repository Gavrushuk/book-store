angular.module('book-store.site')
  .controller('CartCtrl', ['BookService', '$rootScope', function(BookService, $rootScope) {
    
    var vm = this;

    vm.getAllCarts = function () {
      BookService
        .getAllCarts()
        .then( function(res) {
          vm.carts = [];
          for (var i=0; i<res.rows.length; i++) {
            vm.carts.push(res.rows.item(i));
          }
        });
    }
    vm.getAllCarts();

    vm.deleteOneCart = function (id) {
      BookService
        .deleteCart(id)
        .then(function() {
          vm.getAllCarts();
          $rootScope.$emit('updateCart');
        });
      
    };

    $rootScope.$emit('updateCart');

    vm.dropTable = function() {
      BookService
        .dropTable()
    }

    vm.buy = function() {
      BookService
        .getAllCarts()
        .then( function(res) {
          vm.cartsOrder = [];
          for (var i = 0; i<res.rows.length; i++) {
            vm.cartsOrder.push({
              orderid: res.rows.item(i).id,
              bookid: res.rows.item(i).bookid,
              booktitle: res.rows.item(i).booktitle,
              query: res.rows.item(i).query,
              email: vm.emailOrder,
              name: vm.firstNameOrder + ' ' + vm.lastNameOrder,
              phone: vm.phoneOrder
            });
          }
          
          BookService
            .addToOrder(vm.cartsOrder);
        });

        vm.dropTable();
        $rootScope.$emit('updateCart');
    };

    $rootScope.$on('updateCart', vm.getAllCarts);

  }]);