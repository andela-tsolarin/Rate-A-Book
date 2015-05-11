app.controller("home", function ($scope, $window, $route, $book) {

  $scope.rootPath = globalVars.apiHost;
  $scope.books = [];

  $book.getBooks()
    .success(function(data) {
      $scope.books = data;
    });


  $scope.search = function() {
    $window.alert("Searching...");
  }  
});