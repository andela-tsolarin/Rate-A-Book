app.controller("home", function ($scope, $window, $route, $book, $localStorage, $auth) {

  $scope.rootPath = globalVars.apiHost;
  $scope.books = [];
  $scope.booksResult = [];
  $scope.query = '';
  $scope.searchStatus = "Search";

  // Use book service to get all books in api json
  $book.getBooks()
    .success(function(data) {
      $scope.books = data;
      $scope.booksResult = data;
    });


  $scope.search = function() {

    $scope.searchStatus = "Searching...";
    $scope.booksResult = [];

    for (var i = 0; i < $scope.books.length; i++) {
      var book = $scope.books[i];
      var q = $scope.query.toLowerCase();

      if (book.title.toLowerCase().indexOf(q) != -1) {
        $scope.booksResult.push(book);
      }
    }

    $scope.searchStatus = "Search";

  };

  $scope.user = $auth.loggedUser();
  $scope.loggedIn = $auth.isLoggedIn();

});