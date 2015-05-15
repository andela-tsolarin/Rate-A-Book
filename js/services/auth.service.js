app.factory('$auth', function ($localStorage) {

  var auth = {};

  auth.login = function(name) {
    $localStorage.user = name;
  };

  auth.logout = function() {
    $localStorage.user = '';
  };

  auth.loggedUser = function() {
    return $localStorage.user;
  };

  auth.isLoggedIn = function() {
    return ($localStorage.user && $localStorage.user != '');
  };

  return auth;

});
