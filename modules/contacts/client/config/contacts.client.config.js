(function () {
  'use strict';

  angular
    .module('contacts')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Contacts',
      state: 'contacts',
      type: 'dropdown',
      position: 6,
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'contacts', {
      title: 'List Contacts',
      state: 'contacts.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'contacts', {
      title: 'Create Contact',
      state: 'contacts.create',
      roles: ['admin']
    });

    Menus.addMenuItem('topbar', {
      title: 'Contact',
      state: 'contactus',
      position: 7,
      roles: ['user']
    });
  }
})();
