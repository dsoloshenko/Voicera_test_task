require 'test_helper'
class MeetingTest < ActiveSupport::TestCase
  fixtures :meetings

  test "meeting title must not be empty" do
    meeting = Meeting.new
    assert meeting.invalid?
    assert meeting.errors[:title].any?
  end

end