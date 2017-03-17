angular.module('book-store.site')
  .controller('SignInCtrl', ['$state', 'AuthService', '$timeout', '$scope', '$mdToast', function($state, AuthService, $timeout, $scope, $mdToast) {
    
    var vm = this;

    if (localStorage.userActive == 'true') {
      $state.go('site.books');
    }

    $scope.showSimpleToast = function(text) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(text)
          .position('')
          .hideDelay(3000)
      );
    };

    vm.signIn = function() {
      
      AuthService
        .checkUser(vm.loginSignIn, vm.passwordSignIn)
        .then(function(res) {
          vm.checkUserAuth = [];
          for (var i = 0; i < res.rows.length; i++) {
            vm.checkUserAuth.push(res.rows.item(i));
          }

          if (vm.checkUserAuth.length == 0) {

            console.log('Sorry. This user is not autoresation');
          
          } else {

            $state.go('site.books')
            localStorage.setItem('userActive', true);
            localStorage.setItem('user', vm.checkUserAuth[0].login);
            localStorage.setItem('status', vm.checkUserAuth[0].status);
            localStorage.setItem('alert', 1);

          }

        });

        $scope.showSimpleToast('Welcome! Autoresation is success!');

    }

  }]);