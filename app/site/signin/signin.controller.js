angular.module('book-store.site')
  .controller('SignInCtrl', ['$state', 'AuthService', function($state, AuthService) {
    
    var vm = this;

    vm.auth = false;
/*
    vm.createAdmin = function() {
      AuthService
        .createAdmin({
          login: 'admin',
          password: 'admin'
        });
  };*/

    vm.signIn = function() {
      
      AuthService
        .checkUser(vm.loginSignIn, vm.passwordSignIn)
        .then(function(res) {
          vm.checkUserAuth = [];
          for (var i = 0; i < res.rows.length; i++) {
            vm.checkUserAuth.push(res.rows.item(i));
          }

          if (vm.checkUserAuth.length == 0) {
            vm.auth = false;
            console.log('Sorry. This user is not autoresation');
          
          } else {
            vm.auth = true;
            console.log('Autoresation is success! Welcome to site ' + vm.checkUserAuth[0].login);

          }

        });

    }

  }]);