angular.module('book-store.admin')
  .controller('BookListCtrl', ['BookService', '$stateParams', '$state', function(BookService, $stateParams, $state) {

    if (localStorage.auth == 'false') {
      $state.go('admin.auth');
    }

    var vm = this;

    vm.logOut = function() {
      localStorage.setItem('auth', false);
      $state.go('admin.auth');
    }
    
    //dalete book
    this.deleteBook = function (id) {
      BookService
      .deleteBook(id);
      vm.getAllBooks();
    };

    //all books
    vm.getAllBooks = function() { BookService
      .getAll()
      .then(function(res) {
        vm.books = [];
        for(var i=0; i < res.rows.length; i++){
          vm.books.push(res.rows.item(i));
        }
      });
    };

    vm.getAllBooks();

  }]);