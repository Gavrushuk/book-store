angular.module('book-store.site')
  .controller('BookCtrl', ['BookService', '$stateParams', '$mdToast', '$rootScope', '$scope', function (BookService, $stateParams, $mdToast, $rootScope, $scope) {

    var vm = this;

    $scope.showSimpleToast = function(text) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(text)
          .position('')
          .hideDelay(3000)
      );
    };

    BookService
      .getById($stateParams.id)
      .then(function(res) {
        vm.books = [];
        for(var i=0; i < res.rows.length; i++){
          vm.books.push(res.rows.item(i));
        }

        vm.queryParse = function() {

          BookService
            .queryParse(vm.books[0].bookid)
            .then(function(res) {
              vm.query = [];
              for(var i=0; i < res.rows.length; i++){
                vm.query.push(res.rows.item(i));
              }

              if (vm.query.length == 0) {
                
                BookService
                  .addToCart(
                    {
                      bookid: vm.books[0].bookid,
                      booktitle: vm.books[0].booktitle,
                      query: 1,
                      price: vm.books[0].price
                    }
                  );

              } else {

                BookService
                  .updateQuery(vm.query[0].id,
                    {
                      query: vm.query[0].query + 1,
                      price: vm.query[0].price + vm.books[0].price
                    }
                  );
                  
              }

              $scope.showSimpleToast('Product added to cart!');

              $rootScope.$emit('updateCart');

            })
        };

      });

  }]);