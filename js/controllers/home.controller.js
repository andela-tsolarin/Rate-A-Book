app.controller("home", function ($scope, $window, $route, $book, $localStorage) {

  $scope.rootPath = globalVars.apiHost;
  $scope.books = [];
  $scope.booksResult = [];
  $scope.query = '';
  $scope.searchStatus = "Search";

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

  }

  $scope.user = '';
  $scope.loggedIn = false;

  if ($localStorage.user && $localStorage.user != '') {
    $scope.user = $localStorage.user;
    $scope.loggedIn = true;
  }

  $scope.login = function() {
    if ($scope.user != '') {
      $localStorage.user = $scope.user
      $scope.loggedIn = true;
      $('.uk-modal-close').click();
    }
  };

  $scope.logout = function() {
    $localStorage.user = '';
    $scope.loggedIn = false;
  };

});