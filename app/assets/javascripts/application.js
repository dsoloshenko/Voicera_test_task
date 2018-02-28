// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require moment
//= require bootstrap-sprockets
//= require bootstrap-datetimepicker
//= require underscore
//= require backbone
//= require backbone.marionette
//= require backbone-relational
//= require backbone-syphon
//= require backbone-validation
//= require_tree ./vendor
//= require_tree ../templates
//= require voicera_test
//= require_tree ./apps
//= require_tree ./entities

$(document).ready(function(){
  // Start the application after loading all the dependencies, ...
  VoiceraTest.start();
});
