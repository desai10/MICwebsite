(function () {
  'use strict';

  angular
    .module('events')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('events', {
        abstract: true,
        url: '/events',
        template: '<ui-view/>'
      })
      .state('events.list', {
        url: '',
        templateUrl: 'modules/events/client/views/list-events.client.view.html',
        controller: 'EventsListController',
        controllerAs: 'vm',
        data: {
          roles: ['user','admin'],
          pageTitle: 'Events List'
        }
      })
      .state('events.create', {
        url: '/create',
        templateUrl: 'modules/events/client/views/form-event.client.view.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        resolve: {
          eventResolve: newEvent
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Events Create'
        }
      })
      .state('events.edit', {
        url: '/:eventId/edit',
        templateUrl: 'modules/events/client/views/form-event.client.view.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        resolve: {
          eventResolve: getEvent
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Event {{ eventResolve.name }}'
        }
      })
      .state('events.view', {
        url: '/:eventId',
        templateUrl: 'modules/events/client/views/view-event.client.view.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        resolve: {
          eventResolve: getEvent
        },
        data:{
          roles: ['user','admin'],
          pageTitle: 'Event {{ articleResolve.name }}'
        }
      });
  }

  getEvent.$inject = ['$stateParams', 'EventsService'];

  function getEvent($stateParams, EventsService) {
    return EventsService.get({
      eventId: $stateParams.eventId
    }).$promise;
  }

  newEvent.$inject = ['EventsService'];

  function newEvent(EventsService) {
    return new EventsService();
  }
})();
