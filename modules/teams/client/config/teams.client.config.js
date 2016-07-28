(function () {
  'use strict';

  angular
    .module('teams')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Teams',
      state: 'teams',
      type: 'dropdown',
      position: 5,
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'teams', {
      title: 'List Teams',
      state: 'teams.list'
    });
    
    Menus.addMenuItem('topbar', {
      title: 'Team',
      state: 'teams.list',
      position: 6,
      roles: ['user']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'teams', {
      title: 'Create Team',
      state: 'teams.create',
    });
  }
})();
