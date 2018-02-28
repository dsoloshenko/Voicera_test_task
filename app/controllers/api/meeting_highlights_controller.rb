require 'date'

class Api::MeetingHighlightsController < ApplicationController
  before_action :find_meeting_highlight, only: [:show, :update, :destroy]

# GET /meetings
  def index
    @meetings = Meeting.all
    render json: @meetings, include: 'meeting_highlights'
  end

# POST /meeting
  def create
  end

# GET /meeting/:id
  def show
    puts "========================================================"
    puts "========================================================"
    puts "========================================================"

    json_response(@meeting)
  end

# PUT /meeting/:id
  def update
    @meeting.update(meeting_params)
    @meeting.meeting_highlights.destroy_all
    highlight_params[:highlight_text].split(';').each{|highlight_param| @meeting.meeting_highlights.create({highlight_text: highlight_param.strip})} unless highlight_params.blank?
    head :no_content
  end

# DELETE /meeting/:id
  def destroy
    @meeting.destroy
    head :no_content
  end

end