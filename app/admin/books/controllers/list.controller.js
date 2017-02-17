angular.module('book-store.admin')
  .controller('BookListCtrl', ['BookService', '$stateParams', '$state', function(BookService, $stateParams, $state) {

    if (localStorage.auth == 'false') {
      $state.go('admin.auth');
    }

    var vm = this;

    vm.buttonTest = function() {
      vm.fileImg = document.getElementById('file_img').files[0].state;
      console.log(vm.fileImg);
    }

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