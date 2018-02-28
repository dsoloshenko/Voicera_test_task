class CreateMeetings < ActiveRecord::Migration
  def change
    create_table :meetings do |t|
      t.string    :title, null: false, limit: 128
      t.string    :organizer_email, null: false, limit: 64
      t.timestamp :start_time
      t.timestamp :end_time
      t.timestamps
    end
  end
end

