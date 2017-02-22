angular.module('book-store.admin')
  .controller('BookEditCtrl', ['BookService', '$stateParams', '$state', function (BookService, $stateParams, $state) {
    var vm = this;

    BookService
      .getById($stateParams.id)
      .then(function(res) {
        vm.books = [];
        for(var i=0; i < res.rows.length; i++){
          vm.books.push(res.rows.item(i));
        }
        
        vm.editBook = function() {
          BookService
            .editBook(vm.books[0].id, {
              title: vm.books[0].title,
              author: vm.books[0].author,
              category: vm.books[0].category,
              price: vm.books[0].price
          });
          $state.transitionTo("admin.books");
        }

      });
      
  }]);