/**
 * Show users new and edit modal window, show users collection
 **/
VoiceraTest.module('MeetingApp.Show', function(Show, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Show.Controller = {
    show: function(layout) {
      var _this = this;
      var meetings = VoiceraTest.request('meetings:entity');
      meetings.on('sync', function() {
        _this.meetings_collection = new  VoiceraTest.Collections.Meetings(meetings.models);
        var  meetingsView = _this.getMeetingsCollectionView();
        layout.show(meetingsView);
        meetingsView.on('itemview:delete:meeting', function(view, meeting) {
          meeting.destroy();
        });
        meetingsView.on('itemview:edit:meeting', function(view, meeting) {
          _this.meetingNewRegion(layout, meeting, meetingsView);
        })
      });
    },
    meetingNewRegion: function(layout, model, meetingsView) {
      var _this = this,
        meeting = new VoiceraTest.Models.Meeting(),
        meetingNewView = (!!model) ? this.getMeetingEditView(model) : this.getMeetingNewView(meeting),
        modal = new ModalRegion({el:'#modal'});
      modal.show(meetingNewView);
      meetingNewView.on('modal:close', function () {
        modal.close();
      });
      meetingNewView.on('save:meeting', function(meeting_model) {
        if (meeting_model.isValid(true)) {
          modal.close();
        }
        meeting_model.save(null, {
          success: function() {
            _this.meetings_collection.add(meeting_model);
          }
        });
      });
      meetingNewView.on('edit:meeting', function(meeting) {
        if (meeting.isValid(true)) {
          modal.close();
        }
        meeting.save(null, {
          success: function() {
            _this.show();
          }
        });
      })
    },

    getMeetingNewView: function(meeting){
      return new Show.New({model: meeting});
    },
    getMeetingEditView: function(meeting){
      return new Show.Edit({model: meeting});
    },
    getMeetingsCollectionView: function(){
      return new Show.Collection({collection: this.meetings_collection});
    }

  };

  VoiceraTest.vent.on('render:meeting:modal', function(layout) {
    Show.Controller.meetingNewRegion(layout);
  });
  VoiceraTest.vent.on('render:meetings:collection', function(layout) {
    Show.Controller.show(layout);
  });
});