angular.module('book-store.site')
  .controller('HomeCtrl', ['BookService', 'AuthService', '$rootScope', function(BookService, AuthService, $rootScope) {
    
    var vm = this;

    BookService
      .getAll()
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

          $rootScope.$emit('updateCart');

        })
    };

    vm.dropTable = function() {
      AuthService
        .dropTableUsers();
        console.log('delete');
    };

  }]);