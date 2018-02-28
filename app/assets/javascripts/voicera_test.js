/**
 * voicera_test.js
 *
 * Main application file.
 * It defines the namespace of the application.
 * It operates the start sequence.
 **/
'use strict';

var VoiceraTest = new Backbone.Marionette.Application({});

VoiceraTest.addRegions({
  pageContentRegion:   '#page-content'
});

// Define modal region.
var ModalRegion = Marionette.Region.extend({
  constructor: function() {
    Marionette.Region.prototype.constructor.apply(this, arguments);

    this.ensureEl();
    this.$el.on('hidden', {region:this}, function(event) {
      event.data.region.close();
    });
  },

  onShow: function() {
    this.$el.modal('show');
  },

  onClose: function() {
    this.$el.modal('hide');
  }
});

/**
 * Initialize the application.
 **/
VoiceraTest.addInitializer(function(options) {

});

VoiceraTest.on("initialize:before", function(){
});

/**
 * Navigation helper of the application
 **/
VoiceraTest.navigate = function(route, options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

/**
 * Helper to fetch the current route parameters.
 **/
VoiceraTest.getCurrentRoute = function(){
  return Backbone.history.fragment;
};

/**
 * Load the application main view.
 **/
VoiceraTest.on("initialize:after", function(){
  Backbone.history.start({ pushState: true, hashChange: false });
});


