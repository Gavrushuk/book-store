angular.module('book-store.site')
  .controller('CategoryCtrl', ['BookService', '$stateParams', '$rootScope', '$scope', '$mdToast', function (BookService, $stateParams, $rootScope, $scope, $mdToast) {
    
    var vm = this;

    $scope.showSimpleToast = function(text) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(text)
          .position('')
          .hideDelay(3000)
      );
    };

    vm.category = $stateParams.id;

    //get by category
    BookService
      .getByCategory(vm.category)
      .then(function(res) {
        vm.books = [];
        for(var i=0; i < res.rows.length; i++){
          vm.books.push(res.rows.item(i));
        }
      });

    vm.queryParse = function(bookid, booktitle, price) {

      BookService
        .queryParse(bookid)
        .then(function(res) {
          vm.query = [];
          for(var i=0; i < res.rows.length; i++){
            vm.query.push(res.rows.item(i));
          }

          if (vm.query.length == 0) {
            
            BookService
              .addToCart(
                {
                  bookid: bookid,
                  booktitle: booktitle,
                  query: 1,
                  price: price
                }
              );

          } else {

            BookService
              .updateQuery(vm.query[0].id,
                {
                  query: vm.query[0].query + 1,
                  price: vm.query[0].price + price
                }
              );
              
          }

          $scope.showSimpleToast('Product added to cart!');

          $rootScope.$emit('updateCart');

        })
    };
    
  }]);