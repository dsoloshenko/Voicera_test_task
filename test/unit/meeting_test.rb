require 'test_helper'
class MeetingTest < ActiveSupport::TestCase
  fixtures :meetings

  test "meeting title must not be empty" do
    meeting = Meeting.new
    assert meeting.invalid?
    assert meeting.errors[:title].any?
  end

  test "meeting organizer_email must not be empty" do
    meeting = Meeting.new
    assert meeting.invalid?
    assert meeting.errors[:organizer_email].any?
  end

  test "meeting organizer_email must be an email formated" do
    meeting = Meeting.new(  id: 1, title: "Test title", start_time: "01 March 2018 00:00", end_time: "01 March 2018 00:50")
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      meeting.organizer_email = invalid_address
      assert_not meeting.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test "meeting start time must be date formated" do
    meeting = Meeting.new(  id: 1, title: "Test title",  end_time: "01 March 2018 00:50")
    start_times = %w["01 March 201 00:50" "01 Mach 2018 00:50" "019 March 2018 00:50"]
    start_times.each do |invalid_start_time|
      meeting.start_time = invalid_start_time
      assert_not meeting.valid?, "#{invalid_start_time.inspect} should be invalid"
    end
  end

  test "meeting end time must be date formated" do
    meeting = Meeting.new(  id: 1, title: "Test title",  start_time: "01 March 2018 00:50")
    end_times = %w["01 March 201 00:50" "01 Mach 2018 00:50" "019 March 2018 00:50"]
    end_times.each do |invalid_end_time|
      meeting.end_time = invalid_end_time
      assert_not meeting.valid?, "#{invalid_end_time.inspect} should be invalid"
    end
  end

end