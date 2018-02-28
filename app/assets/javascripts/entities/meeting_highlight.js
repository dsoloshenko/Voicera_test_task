/**
 * meeting highlight model
 **/

VoiceraTest.module('Models', function(Models, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Models.MeetingHighlight = Backbone.Model.extend({
    url: function () {
      return '/api/meetings/meeting_highlights/' + this.id ;
    },
    initialize: function(params){
      this.id = params.id;
    }
  });
});