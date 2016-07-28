(function () {
  'use strict';

  angular
    .module('teams')
    .controller('TeamsListController', TeamsListController);

  TeamsListController.$inject = ['TeamsService','$scope', '$state', 'Authentication', 'Menus'];

  function TeamsListController(TeamsService,$scope, $state, Authentication, Menus) {
    var vm = this;

    vm.teams = TeamsService.query();    
    // This provides Authentication context.
    $scope.authentication = Authentication;
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
    $scope.leftOpen = false;
    $scope.rightOpen = false;
    $scope.isl1Active = false;
    $scope.isl2Active = false;
    $scope.isr1Active = false;
    $scope.isr2Active = false;
    $scope.isl1Disabled = false;
    $scope.isl2Disabled = false;
    $scope.isr1Disabled = false;
    $scope.isr2Disabled = false;
    $scope.now = 'l1';
    $scope.now2 = 'left';
    $scope.profileDesc ='this is the profie of the person selected..!';
    
    $scope.profile = function (name) {
      $scope.profileDesc= 'This is '+name+'\'s profile';
    };
    
    $scope.left = function (name,element) {
      $scope.profile(name);
      $scope.now = element;
      $scope.now2 = 'left';
      $scope.leftOpen = !$scope.leftOpen;
      
      if(element === 'l1') {
        $scope.isl1Active = !$scope.isl1Active;
      }
      else if(element === 'l2') {
        $scope.isl2Active = !$scope.isl2Active;
      }
      else {
        console.log('isactive func error');
      }
      
      
      $scope.isr1Disabled = !$scope.isr1Disabled;
      $scope.isr2Disabled = !$scope.isr2Disabled;
      
      if(element !== 'l1') {
        $scope.isl1Disabled = !$scope.isl1Disabled;
      }
      else if(element !== 'l2') {
        $scope.isl2Disabled = !$scope.isl2Disabled;
      }
      else {
        console.log('isdisabled func error');
      }
    };
    
    
    $scope.right = function (name,element) {
      $scope.profile(name);
      $scope.now = element;
      $scope.now2 = 'right';
      $scope.rightOpen = !$scope.rightOpen;
      
      if(element === 'r1') {
        $scope.isr1Active = !$scope.isr1Active;
      }
      else if(element === 'r2') {
        $scope.isr2Active = !$scope.isr2Active;
      }
      else {
        console.log('isactive func error');
      }
      
      $scope.isl1Disabled = !$scope.isl1Disabled;
      $scope.isl2Disabled = !$scope.isl2Disabled;
      
      if(element !== 'r1') {
        $scope.isr1Disabled = !$scope.isr1Disabled;
      }
      else if(element !== 'r2') {
        $scope.isr2Disabled = !$scope.isr2Disabled;
      }
      else {
        console.log('isdisabled func error');
      }
    };
    
    $scope.back = function () {
      if($scope.now2 === 'left') {
        $scope.left('',$scope.now);
      }
      else if($scope.now2 === 'right') {
        $scope.right('',$scope.now);
      }
      else {
        console.log('error back fun');
      }
    };
  }
  
})();
