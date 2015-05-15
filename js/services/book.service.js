app.factory('$book', function($http) {

  var book = {};

  book.getBooks = function() {
    return $http.get(globalVars.apiHost + "/books.json");
  };

  return book;

});
