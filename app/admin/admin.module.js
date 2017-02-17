angular.module('book-store.admin', [])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: '/app/admin/admin-nav/admin.html'
      })
      .state('admin.auth', {
        url: '/auth',
        templateUrl: '/app/admin/books/views/adminauth.html',
        controller: 'AdminCtrl',
        controllerAs: 'vm'
      })
//Books
      .state('admin.books', {
        url: '/books',
        templateUrl: '/app/admin/books/views/list.html',
        controller: 'BookListCtrl',
        controllerAs: 'vm',
      })
      .state('admin.books.create', {
        url: '/create',
        parent: 'admin',
        templateUrl: '/app/admin/books/views/create.html',
        controller: 'BookCreateCtrl',
        controllerAs: 'vm'
      })
      .state('admin.books.edit', {
        url: '/edit/:id',
        parent: 'admin',
        templateUrl: '/app/admin/books/views/edit.html',
        controller: 'BookEditCtrl',
        controllerAs: 'vm'
      })
      .state('admin.books.delete', {
        url: '/delete/:id',
        parent: 'admin',
      })
//Orders
      .state('admin.orders', {
        url: '/orders',
        templateUrl: '/app/admin/orders/views/listOrder.html',
        controller: 'ListOrderCtrl',
        controllerAs: 'vm'
      })
      .state('admin.orders.products', {
        url: '/orders/products/:id',
        parent: 'admin',
        templateUrl: '/app/admin/orders/views/listOrderProducts.html',
        controller: 'ListOrderProductsCtrl',
        controllerAs: 'vm'
      })
      .state('admin.orders.delete', {
        url: '/orders/delete/:id',
        parent: 'admin',
      });

  }]);