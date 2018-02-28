require 'test_helper'
class MeetingHighlightTest < ActiveSupport::TestCase

  test "meeting title must not be empty" do
    meeting = MeetingHighlight.new
    assert meeting.invalid?
    assert meeting.errors[:highlight_text].any?
  end

end