var app = angular.module("rateApp",['ngRoute','ngCookies', 'ngStorage']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'partials/home.html',
    controller: 'home'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'home'
  })
  .when('/details/:id', {
    templateUrl: 'partials/details.html',
    controller: 'details'
  });

}]);