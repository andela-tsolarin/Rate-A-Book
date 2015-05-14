app.controller("details", function ($scope, $window, $route, $routeParams, $book, $localStorage) {
  
  var bookId = $routeParams.id;
  $scope.rootPath = globalVars.apiHost;
  $scope.book = {};

  $book.getBooks()
    .success(function(data) {
      loadBook(data);
    });

  var loadBook = function(books) {
    for (var i = 0; i < books.length; i++) {
      if (books[i].id == bookId) {
        $scope.book = books[i];
      }
    }
  }

  $scope.reviews = [];
  $scope.allowReviews = false;
  //$localStorage.reviews = [];
  if (!$localStorage.reviews) {
    $localStorage.reviews = $scope.reviews;
  } else {
    $scope.reviews = $localStorage.reviews;
  }

  if ($localStorage.user && $localStorage.user != '') {
    $scope.allowReviews = true;
  }

  $scope.bookreviews = [];
  var loadReviews = function(){
    $scope.reviews = $localStorage.reviews;
    $scope.bookreviews = [];
    for (var i = $scope.reviews.length - 1; i >= 0; i--) {
      if ($scope.reviews[i].book == $routeParams.id) {
        $scope.bookreviews.push($scope.reviews[i]);
      }
    }
  };


  loadReviews();

  $scope.review = {};
  $scope.review.name = $localStorage.user;
  $scope.review.book = $routeParams.id;
  $scope.submit = function() {
    $scope.review.comment = $scope.comment;
    $localStorage.reviews.push($scope.review);
    loadReviews();
  };

  $scope.delete = function(index){
    var review = $scope.bookreviews[index];
    for (var i = 0; i < $localStorage.reviews.length; i++) {
      if ($localStorage.reviews[i].name == review.name){
        if ($localStorage.reviews[i].book == review.book){
          $localStorage.reviews.splice(i, 1);
          $scope.allowReviews = true;
        }
      }
    }
    loadReviews();
  };

  $scope.isOwner = function(obj) {
    if (obj.name == $localStorage.user)
      $scope.allowReviews = false;

    return obj.name == $localStorage.user;
  };

});