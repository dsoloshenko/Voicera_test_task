
/**
 * The HomeApp
 *
 **/

VoiceraTest.module('HomeApp', function(HomeApp,  VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

 HomeApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '':   'showHomeLayout'
    }
  });

  var API = {
    showHomeLayout: function() {
      HomeApp.Show.Controller.show();
    }
  };

  VoiceraTest.addInitializer(function(){
    new HomeApp.Router({
      controller: API
    });
  });
});