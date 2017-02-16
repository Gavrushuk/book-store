angular.module('book-store.admin')
  .controller('ListOrderCtrl', ['BookService', 'AuthService', function(BookService, AuthService) {
    var vm = this;

    if (localStorage.auth == 'false') {
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

  }]);