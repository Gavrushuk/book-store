angular.module('book-store.site')
  .controller('CartCtrl', ['BookService', 'AuthService', '$rootScope', '$state', function(BookService, AuthService, $rootScope, $state) {
    
    var vm = this;

    var date = new Date();

    if (localStorage.userActive == 'true') {
      vm.userControle = true;
    } else {
      vm.userControle = false;
    }

    vm.getAllCarts = function () {
      BookService
        .getAllCarts()
        .then( function(res) {
          vm.carts = [];
          for (var i=0; i<res.rows.length; i++) {
            vm.carts.push(res.rows.item(i));
          }

          vm.totalPrice = 0;

          for (var i = 0; i < vm.carts.length; i++) {
            vm.totalPrice += +vm.carts[i].price 
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

    vm.buy = function() {
      
      AuthService
        .getByUser(localStorage.user)
        .then(function(res) {
          for (var i = 0; i < res.rows.length; i++) {
            vm.userId = res.rows.item(i).id;
          }

          if (vm.carts.length != 0 && localStorage.userActive == 'true') {

            BookService
              .addToOrder(
                {
                  user_id: vm.userId,
                  created_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
                  updated_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
                  status: 'Will be check'
                })
              .then(function(res) {

                vm.orderId = res.insertId;
                
                BookService
                  .getAllCarts()
                  .then( function(res) {
                    vm.order_product = [];
                    for (var i = 0; i<res.rows.length; i++) {
                      vm.order_product.push({
                        order_id: vm.orderId,
                        book_id: res.rows.item(i).bookid,
                        qty: res.rows.item(i).query,
                        price: res.rows.item(i).price
                      });
                    }
                    
                    BookService
                      .addToOrderProduct(vm.order_product);

                    BookService
                      .deleteAllElementsCart();

                    $rootScope.$emit('updateCart');

                      $state.go('site.books');
                  
                  });
                  
              });

            };

        });

        $rootScope.$emit('updateCart');
    };

    $rootScope.$on('updateCart', vm.getAllCarts);

  }]);