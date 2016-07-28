(function () {
  'use strict';

  angular
    .module('events')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Home',
      state: 'home',
      position: 0,
      roles: ['user']
    });
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Events',
      state: 'events',
      type: 'dropdown',
      position: 1,
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'events', {
      title: 'List Events',
      state: 'events.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'events', {
      title: 'Create Event',
      state: 'events.create',
      roles: ['admin']
    });
    
    Menus.addMenuItem('topbar', {
      title: 'Events',
      state: 'events.list',
      position: 2,
      roles: ['user']
    });
  }
})();
