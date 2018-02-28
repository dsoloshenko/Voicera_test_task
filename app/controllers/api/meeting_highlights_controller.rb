require 'date'

class Api::MeetingHighlightsController < ApplicationController
  before_action :find_meeting_highlight, only: [:show, :update, :destroy]


# GET /meeting_highlight/:id
  def show
    json_response(@meeting_highlight)
  end

# PUT /meeting_highlight/:id
  def update
    @meeting_highlight.update(highlight_params)
    render json: @meeting_highlight
  end

# DELETE /meeting_highlight/:id
  def destroy
    @meeting_highlight.destroy
    head :no_content
  end

  private

  def highlight_params
    params.permit(:highlight_text, :start_time, :end_time, :id)
  end

  def find_meeting_highlight
    @meeting_highlight = MeetingHighlight.find(params[:id])
  end

end