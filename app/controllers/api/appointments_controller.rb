class Api::AppointmentsController < Api::ApplicationController
  skip_before_action :authenticate_user!, only: [:new, :show]

  def index
    appointments = Appointment.all
    render json: appointments.to_json(
        :include => {
            :time_slot => {:include => {:schedule => {
                :only => :date}}},
            :user => {only: [:first_name, :last_name]}
        }), status: :ok
  end

  def new
  end

  def destroy
    appointment = Appointment.find_by(id: params[:id])
    begin
      appointment.destroy
      render json: {}, status: :ok
    rescue
      render json: {}, status: :not_found
    end
  end

  def create
    appointment = Appointment.new(appointment_params)
    if appointment.save
      render json: appointment, status: :created
    else
      render json: {}, status: :not_acceptable
    end
  end

  private
  def appointment_params
    params.require(:appointment).permit(:user_id, :book_time,:time_slot_id)
  end
end
