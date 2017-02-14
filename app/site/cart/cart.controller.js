angular.module('book-store.site')
  .controller('CartCtrl', ['BookService', 'AuthService', '$rootScope', function(BookService, AuthService, $rootScope) {
    
    var vm = this;

    if (localStorage.userActive == 'true') {
      vm.userControle = true;

      AuthService
        .getByUser(localStorage.user)
        .then(function(res) {
          vm.userOrderInfo = [];
          for (var i = 0; i < res.rows.length; i++) {
            vm.userOrderInfo.push(res.rows.item(i));
          }
          vm.emailOrder = vm.userOrderInfo[0].email;
          vm.firstNameOrder = vm.userOrderInfo[0].first_name;
          vm.lastNameOrder = vm.userOrderInfo[0].last_name;
          vm.phoneOrder = vm.userOrderInfo[0].phone;
        });

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
              phone: vm.phoneOrder + ''
            });
          }
          
          if (vm.carts.length != 0) {
            BookService
              .addToOrder(vm.cartsOrder);
          }
        
        });

        $rootScope.$emit('updateCart');
    };

    $rootScope.$on('updateCart', vm.getAllCarts);

  }]);