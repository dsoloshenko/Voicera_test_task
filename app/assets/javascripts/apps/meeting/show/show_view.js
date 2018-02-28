VoiceraTest.module('MeetingApp.Show', function(Show, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Show.New = Marionette.ItemView.extend({
    template: JST['meetings/new'],

    events: {
      'click button.js-meeting-submit': 'submitClicked'
    },

    onRender: function(){
      Backbone.Validation.bind(this);
    },

    onShow: function() {
      $('#start_time, #end_time').datetimepicker({
        format: 'DD MMMM YYYY HH:mm'
      });
    },

    submitClicked: function(e) {
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      this.model.set(data);
      this.trigger('save:meeting',  this.model);
    }

  });

  Show.Edit = Marionette.ItemView.extend({
    template: JST['meetings/edit'],

    events: {
      'click button.js-meeting-submit': 'submitClicked'
    },

    submitClicked: function(e) {
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      this.model.set(data);
      this.trigger('edit:meeting',  this.model);
    }

  });

  Show.Item = Marionette.ItemView.extend({
    template: JST['meetings/item'],
    tagName: 'tr',
    ui: {
      'update_meeting':       '.js-update-meeting',
      'delete_meeting':       '.js-delete-meeting'
    },

    events: {
      'click':                     'highlightName',
      'click @ui.update_meeting':    'updateMeetingClicked',
      'click @ui.delete_meeting':    'deleteMeetingClicked'
    },

    initialize: function() {
      console.log(this);
    },

    highlightName: function(e){
      e.preventDefault();
      this.$el.toggleClass('warning');
    },

    updateMeetingClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('edit:meeting', this.model);
    },

    deleteMeetingClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$el.fadeOut();
      this.trigger('delete:meeting', this.model);
    }
  });

  Show.Collection = Marionette.CompositeView.extend({
    template: JST['meetings/collection'],
    itemView: Show.Item,
    itemViewContainer: 'tbody'
  });

});