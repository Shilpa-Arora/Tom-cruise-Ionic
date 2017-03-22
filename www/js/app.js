// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var TCapp = angular.module('TCapp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform, $rootScope, $location) {
$rootScope.goHome = function() {
  $location.path('/list');
};

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

TCapp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/list',
    {
      controller: 'ListController',
      templateUrl: 'partials/list.html'
    })
    .when('/details/:itemId',
    {
      controller: 'DetailController',
      templateUrl: 'partials/details.html'
    })
    .otherwise({redirectTo: '/list'});
}]);

TCapp.controller('ListController',['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading) {
  $scope.loadMovies = function() {
    $ionicLoading.show(); //start spinner
    $http.get("http://netflixroulette.net/api/api.php?actor=tom%20cruise")
         .success(function(response) {
            console.log(response);
            $scope.chars = response;
            $ionicLoading.hide();
         })
  }
  $scope.loadMovies();
}]);

TCapp.controller('DetailController',['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams) {
  $ionicLoading.show();
 $http.get("http://netflixroulette.net/api/api.php?actor=tom%20cruise")
      .success(function(response) {
        $scope.characterDetail = response[$routeParams.itemId];
        $scope.characterDetail.largeImage = $scope.characterDetail.url;

        $ionicLoading.hide();
      });

}]);
TCapp.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
