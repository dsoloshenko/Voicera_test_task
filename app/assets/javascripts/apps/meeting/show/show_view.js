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
      this.model.set('meeting_highlights', _.map(data.highlight_text.split(';'), function(text){  if (text.length > 0) { return  {highlight_text: text} }}));
      console.log(this.model);
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
      this.model.set('meeting_highlights', _.map(data.highlight_text.split(';'), function(text){ if (text.length > 0) { return  {highlight_text: text}; } }));
      this.trigger('edit:meeting',  this.model);
    }

  });

  Show.Item = Marionette.ItemView.extend({
    template: JST['meetings/item'],
    tagName: 'tr',
    ui: {
      'update_meeting':       '.js-update-meeting',
      'delete_meeting':       '.js-delete-meeting',
      'edit_highlight':        '.js-edit-highlight'
    },

    events: {
      'click':                     'highlightName',
      'click @ui.update_meeting':    'updateMeetingClicked',
      'click @ui.delete_meeting':    'deleteMeetingClicked',
      'click @ui.edit_highlight':    'editHighlightClicked'
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
    },

    editHighlightClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('edit:highlight', this.model);
    }
  });

  Show.Collection = Marionette.CompositeView.extend({
    template: JST['meetings/collection'],
    itemView: Show.Item,
    itemViewContainer: 'tbody'
  });

});