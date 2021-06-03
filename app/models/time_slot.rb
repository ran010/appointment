class TimeSlot
  include Mongoid::Document
  include Mongoid::Timestamps

  field :available_time, type: Array, default: ['09:00AM - 09:30AM','09:30AM - 10:00AM','10:00AM - 10:30AM','10:30AM - 11:00AM','11:00AM - 11:30AM','11:30AM - 12:00PM','12:00PM - 12:30PM','12:30PM - 13:00PM','13:00PM - 13:30PM']
  field :reserved_time,  type: Array, default: []
  belongs_to :schedule
  has_many :appointments

  attr_accessor :schedule_date
  def schedule_date
    schedule.date
  end
end
