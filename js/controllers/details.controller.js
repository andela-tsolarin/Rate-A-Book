app.controller("details", function ($scope, $window, $route, $routeParams, $book, $localStorage, $auth, $location) {
  
  var bookId = $routeParams.id; // Get book Id from URI
  $scope.rootPath = globalVars.apiHost; // Get root link to images folder
  $scope.book = {}; // Create book object

  $book.getBooks()
    .success(function(data) {
      loadBook(data);
    });


  // Load book based on it's identifier (id) in the local storage
  var loadBook = function(books) {
    for (var i = 0; i < books.length; i++) {
      if (books[i].id == bookId) {
        $scope.book = books[i];
      }
    }
  }

  
  $scope.reviews = [];  // Array to hold all reviews
  $scope.loggedIn = $auth.isLoggedIn(); // Get if user is logged in
  $scope.user = $auth.loggedUser(); // Get logged in user
  $scope.allowReviews = false;
  if($auth.isLoggedIn())
    $scope.allowReviews = $auth.isLoggedIn();

  if (!$localStorage.reviews) {
    $localStorage.reviews = $scope.reviews;
  } else {
    $scope.reviews = $localStorage.reviews;
  }


  $scope.bookreviews = []; // Array to hold all reviews shown after a search action
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
  // alert($auth.loggedUser());
  $scope.review.book = $routeParams.id;

  // Submit review
  $scope.submit = function() {
    $scope.review.name = $auth.loggedUser();
    $scope.review.comment = $scope.comment;
    $localStorage.reviews.push($scope.review);
    loadReviews();
  };

  // Edit review
  $scope.showEdit = function(index) {
    $scope.review = $scope.bookreviews[index];
  };

  $scope.hideEdit = function() {
    $('.uk-modal-close').click();
  };

  // Delete review
  $scope.delete = function(index){
    var review = $scope.bookreviews[index];
    for (var i = 0; i < $localStorage.reviews.length; i++) {
      if ($localStorage.reviews[i].name == review.name) {
        if ($localStorage.reviews[i].book == review.book) {
          $localStorage.reviews.splice(i, 1);
          $scope.allowReviews = true;
        }
      }
    }
    loadReviews();
  };

  // Logoout 
  $scope.logout = function() {
    $auth.logout();
    $location.path('home');
  };


  // Check if the logged in user is the owner of the review in the index
  $scope.isOwner = function(obj) {
    if (obj.name == $localStorage.user)
      $scope.allowReviews = false;

    return obj.name == $localStorage.user;
  };

});