'use strict';

angular.module('core')

.controller('HomeController', ['$scope', '$state', 'Authentication', 
  function ($scope, $state, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;
  }
]);