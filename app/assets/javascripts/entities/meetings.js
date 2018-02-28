/**
 * meetings collection
 **/

VoiceraTest.module('Collections', function(Collections, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Collections.Meetings = Backbone.Collection.extend({
    model: VoiceraTest.Models.Meeting,
    url: '/api/meetings',
    fetch: function() {
      Backbone.Collection.prototype.fetch.call(this);
    }
  });

  // Public API./
  VoiceraTest.reqres.setHandler("meetings:entity", function(){
    var meetings= new VoiceraTest.Collections.Meetings();
    meetings.fetch();
    return meetings;
  });
});