'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Contact = mongoose.model('Contact'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'), 
  config = require(path.resolve('./config/config')),
  nodemailer = require('nodemailer'),
  async = require('async');
  
var smtpTransport = nodemailer.createTransport(config.mailer.options);
 
var transporter = nodemailer.createTransport();
 

exports.sendQuery = function (req, res, next) {
  console.log('waterfall will start...');
  var data = req.body;  
  async.waterfall([
    function (done) {
      res.render(path.resolve('modules/contacts/server/templates/contact-us'), {
        name: data.username,
        appName: config.app.title,
        email: data.userEmail,
        body: data.emailBody
      }, 
      function (err, emailHTML) {
        done(err,emailHTML);
      });
    },
    function (emailHTML,done) {
      var mailOptions = {
        to: 'kartheekjavvaji@gmail.com',
        from: data.userEmail,
        subject: 'MIC | VIT general enquiry',
        html: emailHTML
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          res.send({
            message: 'We have got your message. Will reach you as soon as possible.'
          });
        } else {
          return res.status(400).send({
            message: 'Failure sending email'
          });
        }
        done(err);        
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
  
  
};
/**
 * Create a Contact
 */
exports.create = function(req, res) {
  var contact = new Contact(req.body);
  contact.user = req.user;

  contact.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contact);
    }
  });
};

/**
 * Show the current Contact
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var contact = req.contact ? req.contact.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  contact.isCurrentUserOwner = req.user && contact.user && contact.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(contact);
};

/**
 * Update a Contact
 */
exports.update = function(req, res) {
  var contact = req.contact ;

  contact = _.extend(contact , req.body);

  contact.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contact);
    }
  });
};

/**
 * Delete an Contact
 */
exports.delete = function(req, res) {
  var contact = req.contact ;

  contact.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contact);
    }
  });
};

/**
 * List of Contacts
 */
exports.list = function(req, res) { 
  Contact.find().sort('-created').populate('user', 'displayName').exec(function(err, contacts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(contacts);
    }
  });
};

/**
 * Contact middleware
 */
exports.contactByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Contact is invalid'
    });
  }

  Contact.findById(id).populate('user', 'displayName').exec(function (err, contact) {
    if (err) {
      return next(err);
    } else if (!contact) {
      return res.status(404).send({
        message: 'No Contact with that identifier has been found'
      });
    }
    req.contact = contact;
    next();
  });
};
