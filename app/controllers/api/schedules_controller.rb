class Api::SchedulesController < Api::ApplicationController
  skip_before_action :authenticate_user!, only: [:show]

  def index
    schedules =  params[:time_block].present? ? Schedule.for_the_week.where(appointment_interval: {'$gt': params[:time_block]}) : Schedule.for_the_week
    render json: schedules.to_json
  end

  def show
    begin
      schedule =  Schedule.find_by(date: params[:id]).time_slot
      render json: schedule
    rescue
      render json: {}
    end
  end
end