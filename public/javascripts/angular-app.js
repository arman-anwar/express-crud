var myApp = angular.module('myApp', ['ui.router']);
myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/books');
  $stateProvider.state('books', {
    url: '/books',
    templateUrl: 'views/books.html'
  })
    .state("editbooks", {
      url: '/books/edit/:id',
      templateUrl: "views/editbooks.html"
    })
    .state("addbooks", {
      url: '/books/add',
      templateUrl: "views/editbooks.html"
    });
}
]);

myApp.filter('myTableFilter', function () {
  // Just add arguments to your HTML separated by :
  // And add them as parameters here, for example:
  // return function(dataArray, searchTerm, argumentTwo, argumentThree) {
  return function (dataArray, searchTerm, searchType) {
    // If no array is given, exit.
    //    console.log(dataArray);
    //    console.log(searchTerm);
    //    console.log(searchType);
    if (!dataArray) {
      return;
    }
    // If no search term exists, return the array unfiltered.
    else if (!searchTerm) {
      return dataArray;
    }
    // Otherwise, continue.
    else {
      // Convert filter text to lower case.
      var term = searchTerm.toLowerCase();
      // Return the array and filter it by looking for any occurrences of the search term in each items id or name. 
      return dataArray.filter(function (item) {
        if (searchType == 'author') {
          if (item.author && item.author.toLowerCase().indexOf(term) > -1) { return true; }
        } else if (searchType == 'title') {
          if (item.title && item.title.toLowerCase().indexOf(term) > -1) return true;
        } else if (searchType == 'genre') {
          if (item.genre && item.genre.toLowerCase().indexOf(term) > -1) return true;
        } else return false;
      });
    }
  }
});


myApp.controller('AppCtrl', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
  $scope.sortType = 'title'; // set the default sort type
  $scope.sortReverse = false;  // set the default sort order
  $scope.searchBook = '';     // set the default search/filter term

$(function () {
            // wait till load event fires so all resources are available
            $('.datepicker').datepicker();

          });

  var refresh = function () {
    if ($state.is('editbooks')) {
      $scope.formName = 'Update Book';
      if ($stateParams.id) $scope.editForm = true;
      $http.get('/books/id/' + $stateParams.id).success(function (response) {
        $scope.book = response;
      });
    } else if ($state.is('addbooks')) {
      $scope.formName = 'Add new Book';
    } else {
      $http.get('/books').success(function (response) {
        $scope.books = response;
      });
    }
  };

  refresh();

  $scope.addBook = function () {
    $http.post('/books/', $scope.book).success(function (response) {
      console.log(response);
      $state.go('books');
    }).error(function (err) {
      console.log(err);
    });
  };

  $scope.remove = function (id) {
    console.log(id);
    $http.delete('/books/id/' + id).success(function (response) {
      refresh();
    });
  };

  $scope.edit = function (id) {
    $state.go('editbooks', { id: id });
  };

  $scope.updateBook = function () {
    console.log($scope.book._id);
    $http.put('/books/id/' + $scope.book._id, $scope.book).success(function (response) {
      $state.go('books');
    })
  };
}]);