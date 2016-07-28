(function() {
  'use strict';

  angular
    .module('contacts')
    .controller('ContactusController', ContactusController);

  ContactusController.$inject = ['$http','$scope', '$state', 'Authentication'];

  function ContactusController($http,$scope,$state,Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.username = vm.authentication.user.username;
    vm.userEmail = vm.authentication.user.email;
    init();

    vm.contactUs = function(isValid){
      console.log('sendQueryee started');
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.contactUsForm');
        return false;
      }
      console.log('sendQueryasffee started');
      $scope.success = $scope.error = null;
      var data = ({
        username : vm.username,
        userEmail : vm.userEmail,
        emailBody : vm.emailBody
      });
      console.log('sendQuery started'+data.emailBody);   
      $http.post('/api/contactus', data)
      .success(function (response) {
        // Show user success message and clear form
        vm.emailBody = null;
        $scope.$broadcast('show-errors-reset', 'vm.form.contactUsForm');
        $scope.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        $scope.emailBody = null;
        $scope.error = response.message;
      });

    };

    function init() {
    }
  }
})();
