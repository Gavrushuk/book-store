angular.module('book-store.site', [])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('site', {
        templateUrl: '/app/site/views/site.html',
        controller: 'SiteCtrl',
        controllerAs: 'vm',
        abstract: true
      })
      .state('site.category', {
        url: '/category/:id',
        templateUrl: '/app/site/category/category.html',
        controller: 'CategoryCtrl',
        controllerAs: 'vm'
      })
      .state('site.book', {
        url: '/book/:id',
        templateUrl: '/app/site/book/book.html',
        controller: 'BookCtrl',
        controllerAs: 'vm'
      })
      .state('site.cart', {
        url: '/cart',
        templateUrl: '/app/site/cart/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'vm'
      })
      .state('site.books', {
        url: '/',
        templateUrl: '/app/site/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .state('auth', {
        abstract: true,
        templateUrl: '/app/site/views/auth.html'
      })
      .state('auth.signin', {
        url: '/signin',
        templateUrl: '/app/site/signin/signin.html',
        controller: 'SignInCtrl',
        controllerAs: 'vm'
      })
      .state('auth.signup', {
        url: '/signup',
        templateUrl: '/app/site/signup/signup.html',
        controller: 'SignUpCtrl',
        controllerAs: 'vm'
      })
  }]);