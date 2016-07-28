'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Gallery Schema
imageSource : string (img src)
imageTitle: string (img alt )(h2)
eventLink: ui-sref to events[FUTURE PLAN and try #eventTitle]
imageDescription: string (p)
 */
var GallerySchema = new Schema({
  imageTitle: {
    type: String,
    required: 'Please give the image a title',
    trim: true
  },
  imageSource: {
    type: String,
    required: 'Please enter the source http link'
  },
  eventLink: {
    type: String,
    default: ''
    //fill in with the eventState
  },
  imageDescription: {
    type: String,
    required: 'Please enter some description'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Gallery', GallerySchema);
