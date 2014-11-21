/*global angular*/
var options = {
  api: {
    base_url: 'http://localhost:3000'
  }
};
var app = angular.module('BDDGramsApp', ['ngRoute']);

app.factory('AuthenticationService', function () {
  'use strict';
  var auth = {
    isLogged: false
  };

  return auth;
});

app.factory('UserService', function ($http) {
  'use strict';
  return {
    logIn: function (username, password) {
      return $http.post(options.api.base_url + '/login', {username: username, password: password});
    },

    logOut: function () {

    }
  };
});


app.config(['$routeProvider', function ($routeProvider) {
  'use strict';
  $routeProvider.
    when("/", {
      templateUrl: 'partials/parts.list.html',
      controller: 'PartListCtrl',
      access: {requiredLogin: true}
    }).
    when("/login", {
      templateUrl: 'partials/user.login.html',
      controller: 'UserCtrl',
      accsee: {requiredLogin: false}
    });
}]);

app.run(function ($rootScope, $location, AuthenticationService) {
  'use strict';
  $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
    if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
      $location.path("/login");
    }
  });
});
