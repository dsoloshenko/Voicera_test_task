class CreateMeetingHighlights < ActiveRecord::Migration
  def change
    create_table :meeting_highlights do |t|
      t.integer   :meeting_id
      t.string    :highlight_text, null: false, limit: 300
      t.timestamp :start_time
      t.timestamp :end_time
      t.timestamps
    end
  end
end
