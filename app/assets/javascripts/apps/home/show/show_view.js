VoiceraTest.module('HomeApp.Show', function(Show, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Show.Layout = Marionette.Layout.extend({
    template: JST['home/layout'],

    regions: {
      addButtonsRegion:        '#add-buttons-region',
      meetingsRegion:          '#meetings-region'
    }
  });

  Show.Buttons = Backbone.Marionette.ItemView.extend({
    template: JST['home/buttons'],
    ui: {
      add_meeting_button: "#js-new-meeting"
    },
    events:{
      "click @ui.add_meeting_button":  "openMeetingForm"
    },
    openMeetingForm: function(){
      this.trigger('open:meeting:form');
    }
  });

});