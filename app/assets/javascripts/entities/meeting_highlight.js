/**
 * meeting highlight model
 **/

VoiceraTest.module('Model', function(Model, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Model.MeetingHighlight = Backbone.Model.extend({
    url: function () {
      return '/api/meeting_highlights/' + this.id ;
    },
    initialize: function(params){
      this.id = params.id;
    }
  });

  var API = {
    fetch: function (params) {
      var defer = $.Deferred();
      var highlight_meeting = new Model.MeetingHighlight(params);
      highlight_meeting.fetch({async: true, reset: true,
        success: function (data) {
          defer.resolve(data);
        },
        error: function (response) {
          defer.resolve(response._fetch)
        }
      });
      return defer.promise();
    },
    delete: function(params){
      var highlight_meeting = new Model.MeetingHighlight(params);
      $.ajax({ url: highlight_meeting.url(), type: "DELETE"});
    }
  };

  // Public API./
  VoiceraTest.reqres.setHandler("highlight_meeting:entity", function(params){
    return API.fetch(params);
  });

  VoiceraTest.reqres.setHandler("highlight_meeting:delete", function(params){
    return API.delete(params);
  });
});