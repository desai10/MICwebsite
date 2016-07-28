'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Event Schema
imageSource : string (img src)
eventTitle: string (img alt )(h2)
shortDescription: string (p)
[href=#{{title}}full]
fullDescription: string
[id = {{title}}full]
 */
var EventSchema = new Schema({
  eventTitle: {
    type: String,
    unique: 'unique eventTitle is needed',
    required: 'Please fill Event title',
    trim: true
  },
  shortDescription:{
    type: String,
    default: '',
  },
  imageSource: {
    type: String,
    required: 'Please give the image http sourceLink'
  },
  fullDescription: {
    type: String,
    required: 'Please enter the description of this particular event'
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

mongoose.model('Event', EventSchema);
