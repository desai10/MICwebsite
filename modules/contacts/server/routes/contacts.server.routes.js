'use strict';

/**
 * Module dependencies
 */
var contactsPolicy = require('../policies/contacts.server.policy'),
  contacts = require('../controllers/contacts.server.controller');

module.exports = function(app) {
  // Contacts Routes
  app.route('/api/contacts').all(contactsPolicy.isAllowed)
    .get(contacts.list)
    .post(contacts.create);

  app.route('/api/contactus')
    .post(contacts.sendQuery);

  app.route('/api/contacts/:contactId').all(contactsPolicy.isAllowed)
    .get(contacts.read)
    .put(contacts.update)
    .delete(contacts.delete);

  // Finish by binding the Contact middleware
  app.param('contactId', contacts.contactByID);
};
