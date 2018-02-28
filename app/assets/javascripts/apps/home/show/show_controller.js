/**
 * Show home page layout
 **/
VoiceraTest.module('HomeApp.Show', function(Show, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Show.Controller = {
    show: function (params) {
      var _this = this;
      this.layout = this.getHomeLayout();
      VoiceraTest.pageContentRegion.show(this.layout);
      this.getButtonsRegion();
      VoiceraTest.vent.trigger('render:meetings:collection', this.layout.meetingsRegion);
    },

    getButtonsRegion: function() {
      var _this = this;
      var buttonsView = this.getButtonsView();
      this.layout.addButtonsRegion.show(buttonsView);
      buttonsView.on('open:meeting:form', function () {
        VoiceraTest.vent.trigger('render:meeting:modal', _this.layout.meetingsRegion);
      });
    },

    getHomeLayout: function() {
      return new Show.Layout();
    },

    getButtonsView: function() {
      return new Show.Buttons();
    }
  }
});