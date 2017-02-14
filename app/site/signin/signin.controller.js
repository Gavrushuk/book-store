angular.module('book-store.site')
  .controller('SignInCtrl', ['$state', 'AuthService', function($state, AuthService) {
    
    var vm = this;

    if (localStorage.userActive == 'true') {
      $state.go('site.books');
    }

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
            console.log('Autoresation is success! Welcome to site ' + vm.checkUserAuth[0].login);

          }

        });

    }

  }]);