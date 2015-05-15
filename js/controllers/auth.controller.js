app.controller("auth", function ($scope, $window, $route, $book, $localStorage, $auth) {

  $scope.user = $auth.loggedUser();
  $scope.loggedIn = $auth.isLoggedIn();

  $scope.login = function() {
    if ($scope.user != '') {
      $auth.login($scope.user);
      $scope.loggedIn = $auth.isLoggedIn();
      $('.uk-modal-close').click();
      $auth.isLoggedIn();
    }
  };

  $scope.logout = function() {
    $auth.logout();
    $scope.loggedIn = $auth.isLoggedIn();
  };

});