(function () {
  'use strict';

  angular
    .module('galleries')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('galleries', {
        abstract: true,
        url: '/galleries',
        template: '<ui-view/>'
      })
      .state('galleries.list', {
        url: '',
        templateUrl: 'modules/galleries/client/views/list-galleries.client.view.html',
        controller: 'GalleriesListController',
        controllerAs: 'vm',
        data: {
          roles: ['user','admin'],
          pageTitle: 'Galleries List'
        }
      })
      .state('galleries.create', {
        url: '/create',
        templateUrl: 'modules/galleries/client/views/form-gallery.client.view.html',
        controller: 'GalleriesController',
        controllerAs: 'vm',
        resolve: {
          galleryResolve: newGallery
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Galleries Create'
        }
      })
      .state('galleries.edit', {
        url: '/:galleryId/edit',
        templateUrl: 'modules/galleries/client/views/form-gallery.client.view.html',
        controller: 'GalleriesController',
        controllerAs: 'vm',
        resolve: {
          galleryResolve: getGallery
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Gallery {{ galleryResolve.name }}'
        }
      })
      .state('galleries.view', {
        url: '/:galleryId',
        templateUrl: 'modules/galleries/client/views/view-gallery.client.view.html',
        controller: 'GalleriesController',
        controllerAs: 'vm',
        resolve: {
          galleryResolve: getGallery
        },
        data:{
          roles: ['user','admin'],
          pageTitle: 'Gallery {{ articleResolve.name }}'
        }
      });
  }

  getGallery.$inject = ['$stateParams', 'GalleriesService'];

  function getGallery($stateParams, GalleriesService) {
    return GalleriesService.get({
      galleryId: $stateParams.galleryId
    }).$promise;
  }

  newGallery.$inject = ['GalleriesService'];

  function newGallery(GalleriesService) {
    return new GalleriesService();
  }
})();
