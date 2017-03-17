angular.module('book-store.admin')
  .controller('AdminCtrl', ['AuthService', '$state', function (AuthService, $state) {

    var vm = this;

    vm.check;

    if (localStorage.status == 'true') {

      if (localStorage.auth == 'true') {
        $state.go('admin.books');
      }

      vm.signInAdmin = function() {

        AuthService
          .checkAdmin(vm.loginAdmin, vm.passwordAdmin)
          .then(function(res) {
            vm.isAdmin = [];
            for (var i = 0; i < res.rows.length; i++) {
              vm.isAdmin.push(res.rows.item(i));
            }

            if (vm.isAdmin.length == 0) {
          
            } else {
              localStorage.setItem('auth', true);
              $state.go('admin.books');
            }

          });

      }
      
    } else {

      $state.go('site.books');

    }

  }]);