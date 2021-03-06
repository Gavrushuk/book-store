angular.module('book-store.site')
  .controller('SiteCtrl', ['BookService', 'AuthService', '$stateParams', '$http', '$scope', '$rootScope', '$state','$timeout',
   function (BookService, AuthService, $stateParams, $http, $scope, $rootScope, $state, $timeout) {

    var vm = this;

    localStorage.removeItem('alertOrder');

    vm.showAlert = +localStorage.alert === 1;
    vm.aletrSignIn = localStorage.alert;

    $timeout(function() {
      vm.showAlert = false;
      localStorage.alert = 0;
    }, 3000);

    if (localStorage.userActive == 'true') {
      vm.userName = localStorage.user;
      vm.userControle = false;
    } else {
      vm.userControle = true;
    }

    BookService
      .getAll()
      .then(function(res) {
        vm.books = [];
        for(var i=0; i < res.rows.length; i++){
          vm.books.push(res.rows.item(i));
        }
        
        //only one category
        vm.categories = [];
        var index;
        for (var i = 0; i < vm.books.length; i++) {
          index = vm.categories.find(function(book) {
            return book.category == vm.books[i].category;
          })
          if (index == undefined) {
            vm.categories.push(
              {
                category: vm.books[i].category
              }
            );
          }
        }

        //Category length
        for (var i = 0; i < vm.categories.length; i++) {

          vm.categories[i].lengthCat = vm.books.filter(function(book) {
              return book.category == vm.categories[i].category;
            }
          ).length;

        }

  });

    this.classArrow = {
      arrowRight: false,
      arrowDown: true
    };

    this.clickMenuFunc = function() {
      
      if (!this.classArrow.arrowRight) {

        this.classArrow.arrowRight = true;
        this.classArrow.arrowDown = false;
        //console.log(this.classArrow);
      
      } else if (!this.classArrow.arrowDown) {
        
        this.classArrow.arrowRight = false;
        this.classArrow.arrowDown = true;
        //console.log(this.classArrow);

      }
    };

    this.classArrowCart = {
      arrowRight: false,
      arrowDown: true
    };

    this.clickCartFunc = function() {
      
      if (!this.classArrowCart.arrowRight) {

        this.classArrowCart.arrowRight = true;
        this.classArrowCart.arrowDown = false;
        //console.log(this.classArrow);
      
      } else if (!this.classArrowCart.arrowDown) {
        
        this.classArrowCart.arrowRight = false;
        this.classArrowCart.arrowDown = true;
        //console.log(this.classArrow);

      }
    };

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
    }

    $rootScope.$on('updateCart', vm.getAllCarts);

    vm.logOut = function() {
      localStorage.setItem('userActive', false);
      localStorage.setItem('user', 'not found');
      localStorage.setItem('status', 'not found');
      $state.go('auth.signin');
      
      BookService
        .deleteAllElementsCart();
    }
    
  }]);