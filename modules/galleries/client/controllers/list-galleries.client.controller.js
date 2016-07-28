(function () {
  'use strict';

  angular
    .module('galleries')
    .controller('GalleriesListController', GalleriesListController);

  GalleriesListController.$inject = ['GalleriesService','Authentication','$animate'];

  function GalleriesListController(GalleriesService,Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    vm.galleries = GalleriesService.query();
  }
})();

