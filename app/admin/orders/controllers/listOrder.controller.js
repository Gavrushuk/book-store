angular.module('book-store.admin')
  .controller('ListOrderCtrl', ['BookService', 'AuthService', '$state', function(BookService, AuthService, $state) {
    var vm = this;

    if (localStorage.auth == 'false') {
      $state.go('admin.auth');
    }

    vm.logOut = function() {
      localStorage.setItem('auth', false);
      $state.go('admin.auth');
    }

    vm.getAllOrders = function() {

      BookService
        .getAllOrders()
        .then(function(res) {
          vm.orders = [];
          for (var i = 0; i < res.rows.length; i++) {
            let order = {}

            Object.assign(order, res.rows.item(i));

            vm.orders.push(order);

            AuthService
              .getByUserId(res.rows.item(i).user_id)
              .then(function(res) {
                order.user = res.rows.item(0);
              });

            BookService
              .getOrderProductsByOrderId(res.rows.item(i).id)
              .then(function(res) {
                vm.productsLength = [];
                for (var i = 0; i < res.rows.length; i++) {
                  vm.productsLength.push(res.rows.item(i));  
                }
                order.length_products = vm.productsLength.length;
              });
          }
        });  

    }
    vm.getAllOrders();

    //dalete book
    vm.deleteOrder = function (id) {
      BookService
        .deleteOrder(id);

      BookService
        .getOrderProductsByOrderId(id)
        .then(function(res) {
          for (var i = 0; i < res.rows.length; i++) {
            BookService
              .deleteOrderProduct(res.rows.item(i).id);
          }
        })
      vm.getAllOrders();
    };

    vm.statusUpdate = function(id, status) {
    
      if (status == 'Will be check') {
        BookService
          .updateOrder(id, {
            status: 'In check'
          });
      } else if (status == 'In check') {
        BookService
          .updateOrder(id, {
            status: 'Send'
          });
      } else if (status == 'Send') {
        BookService
          .updateOrder(id, {
            status: 'Will be check'
          });
      }

      vm.getAllOrders();
      
    }

  }]);