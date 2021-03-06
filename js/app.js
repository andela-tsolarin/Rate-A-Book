var app = angular.module("rateApp",['ngRoute','ngCookies', 'ngStorage', 'ngSanitize', 'ngEmoticons']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'home'
  })
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'home'
  })
  .when('/details/:id', {
    templateUrl: 'views/details.html',
    controller: 'details'
  });

}]);