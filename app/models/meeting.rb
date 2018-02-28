class Meeting < ActiveRecord::Base
  has_many :meeting_highlights, :class_name => 'MeetingHighlight'

  validates :title, :organizer_email, presence: true
  validates :organizer_email,    length: { maximum: 64 },
            format: { with: /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\Z/i }
  validates_datetime :start_time

  accepts_nested_attributes_for :meeting_highlights, allow_destroy: true,  reject_if: proc { |attributes| attributes['title'].blank? }

end
