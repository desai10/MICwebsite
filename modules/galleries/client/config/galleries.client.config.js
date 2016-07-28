(function () {
  'use strict';

  angular
    .module('galleries')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Galleries',
      state: 'galleries',
      type: 'dropdown',
      position: 3,
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'galleries', {
      title: 'List Galleries',
      state: 'galleries.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'galleries', {
      title: 'Create Gallery',
      state: 'galleries.create',
      roles: ['admin']
    });
    
    Menus.addMenuItem('topbar', {
      title: 'Gallery',
      state: 'galleries.list',
      position: 4,
      roles: ['user']
    });
  }
})();
