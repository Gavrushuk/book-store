angular.module('book-store.admin')
  .controller('BookCreateCtrl', ['BookService', '$state', function (BookService, $state) {
    var vm = this;

    this.createBook = function () {
      BookService
        .createBook(
          {
            title: this.createTitle,
            author: this.createAuthor,
            category: this.createCategory,
            price: this.createPrice,
          }
        ).then(function(result) {
          vm.goBack(); 
        })
    };
    
    this.goBack = function() {
      $state.transitionTo("admin.books");
    }
  }]);