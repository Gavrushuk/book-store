angular.module('book-store.admin')
  .controller('BookCreateCtrl', ['BookService', '$state', function (BookService, $state) {
    var vm = this;

    vm.createBook = function () {

      BookService
        .createBook(
          {
            title: vm.createTitle,
            author: vm.createAuthor,
            category: vm.createCategory,
            price: vm.createPrice,
          }
        ).then(function(result) {
          $state.go('admin.books') 
        })
    };
    
  }]);