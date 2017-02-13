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
      });
      
    this.editBook = function(id, title, author, category) {
      BookService
        .editBook(id, {
          title: title,
          author: author,
          category: category
      });
      vm.goBack();
    }

    vm.goBack = function() {
      $state.transitionTo("admin.books");
    }
  }]);