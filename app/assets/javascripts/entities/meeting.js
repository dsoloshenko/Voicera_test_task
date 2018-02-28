/**
 * user model
 **/

VoiceraTest.module('Models', function(Models, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Models.Meeting = Backbone.Model.extend({
    urlRoot: '/api/meetings',
    validation: {
      title: {
        required: true,
        msg: 'Please enter title'
      },
      organizer_email: [{
        required: true,
        msg: 'Please enter an email address'
      },{
        pattern: 'email',
        msg: 'Please enter a valid email'
      }]
    }
  });
});
