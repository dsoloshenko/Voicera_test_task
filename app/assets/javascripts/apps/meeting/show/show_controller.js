/**
 * Show users new and edit modal window, show users collection
 **/
VoiceraTest.module('MeetingApp.Show', function(Show, VoiceraTest, Backbone, Marionette, $, _) {
  'use strict';

  Show.Controller = {
    show: function(layout) {
      var _this = this;
      this.layout = layout;
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
        });
        meetingsView.on('itemview:edit:highlight', function(view, highlight_id) {
          var highlight_meeting = VoiceraTest.request('highlight_meeting:entity', {id: highlight_id});
          $.when(highlight_meeting).done(function (highlight) {
            _this.meetingHighlightEditRegion(highlight);
          })
        });
        meetingsView.on('itemview:delete:highlight', function(view, highlight_id) {
          VoiceraTest.request('highlight_meeting:delete', {id: highlight_id});
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
            _this.show(_this.layout);
          }
        });
      });
      meetingNewView.on('edit:meeting', function(meeting) {
        if (meeting.isValid(true)) {
          modal.close();
        }
        meeting.save();
      })
    },

    meetingHighlightEditRegion: function(highlight) {
      var _this = this,
        highlightEditView = this.getHighlightEditView(highlight),
        modal = new ModalRegion({el:'#modal'});
      modal.show(highlightEditView);
      highlightEditView.on('modal:close', function () {
        modal.close();
      });
      highlightEditView.on('edit:highlight', function(highlight) {
        if (highlight.isValid(true)) {
          modal.close();
        }
        highlight.save(null, {
          success: function() {
            _this.show(_this.layout);
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
    getHighlightEditView: function(highlight){
      return new Show.HighlightEdit({model: highlight});
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