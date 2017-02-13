angular.module('book-store', 
  [
    'ui.router',
    'book-store.admin',
    'book-store.site',
    'angular-websql',
    'ngMessages'
  ])
  .controller('MainCtrl', ['$scope', function() {
    var vm = this;

    vm.name = 'Illia'
  }])
  .config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
  }]);