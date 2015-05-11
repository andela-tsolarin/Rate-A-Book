app.controller("home", function ($scope, $window, $route, $book) {

  $scope.rootPath = globalVars.apiHost;
  $scope.books = [];
  $scope.booksResult = [];
  $scope.query = '';

  $book.getBooks()
    .success(function(data) {
      $scope.books = data;
      $scope.booksResult = data;
    });


  $scope.search = function() {
    $scope.booksResult = [];

    for (var i = 0; i < $scope.books.length; i++) {
      var book = $scope.books[i];
      var q = $scope.query.toLowerCase();

      if (book.title.toLowerCase().indexOf(q) != -1) {
        console.log(book);
        $scope.booksResult.push(book);
      }
    }

  }  
});