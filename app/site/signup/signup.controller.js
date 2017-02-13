angular.module('book-store.site')
  .controller('SignUpCtrl', ['$state', 'AuthService', function($state, AuthService) {
    
    var vm = this;

    vm.signUp = function() {

        AuthService
          .checkUserLogin(vm.loginSignUp)
          .then(function(res) {
            vm.loginCreated = [];
            for (var i = 0; i < res.rows.length; i++) {
              vm.loginCreated.push(res.rows.item(i));
            }

            AuthService
              .checkUserPhone(vm.phoneSignUp)
              .then(function(res) {
                vm.phoneCreated = [];
                for (var i = 0; i < res.rows.length; i++) {
                  vm.phoneCreated.push(res.rows.item(i));
                }
                
                if (vm.loginCreated.length == 0 || vm.phoneCreated.length == 0) {
    
                  AuthService
                  .createUser({
                    first_name: vm.firstNameSignUp,
                    last_name: vm.lastNameSignUp,
                    email: vm.emailSignUp,
                    phone: vm.phoneSignUp,
                    login: vm.loginSignUp,
                    password: vm.passwordSignUp
                  });
                  console.log('Success');
    
                } else {

                  console.log('Sorry! This user was created!');

                }

              });
          });
          
    };
/*
    vm.dropTable = function() {
          AuthService
            .dropTable();
        }
*/

  }]);