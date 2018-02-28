require 'date'

class Api::MeetingsController < ApplicationController
  before_action :find_meeting, only: [:show, :update, :destroy]

# GET /meetings
  def index
    @meetings = Meeting.all
    render json: @meetings, include: 'meeting_highlights'
  end

# POST /meeting
  def create
    @meeting = Meeting.create!(meeting_params)
    @highlight = highlight_params[:highlight_text].split(';').each{|highlight_param| @meeting.meeting_highlights.create({highlight_text: highlight_param.strip})} unless highlight_params.blank?
    json_response(@meeting, :created)
  end

# GET /meeting/:id
  def show
    json_response(@meeting)
  end

# PUT /meeting/:id
  def update
    @meeting.update(meeting_params)
    @meeting.meeting_highlights.destroy_all
    puts "=============================================="
    puts highlight_params[:highlight_text]
    highlight_params[:highlight_text].split(';').each{|highlight_param| @meeting.meeting_highlights.create({highlight_text: highlight_param.strip})} unless highlight_params.blank?
    head :no_content
  end

# DELETE /meeting/:id
  def destroy
    @meeting.destroy
    head :no_content
  end

  private

  def meeting_params
    params.permit(:title, :organizer_email, :start_time, :end_time, meeting_highlights_attributes: [ :highlight_text ])
  end

  def highlight_params
    params.permit(:highlight_text)
  end

  def find_meeting
    @meeting = Meeting.find(params[:id])
  end
end