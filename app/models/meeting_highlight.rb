class MeetingHighlight < ActiveRecord::Base

  belongs_to :meeting, class_name: 'Meeting', foreign_key: 'meeting_id'

  validates :highlight_text, :presence => true
  validates_presence_of :meeting

end

