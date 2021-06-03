class Schedule
  include Mongoid::Document
  include Mongoid::Timestamps
  field :date,   type: Date
  field :close_time,  type: Time
  field :open_time,  type: Time
  field :appointment_interval,  type: Integer
  has_one :time_slot
  scope :for_the_week, ->{where('$and': [ { date: {'$gte': Date.today + 1.day}}, {date: {'$lte': Date.tomorrow + 6.days} }] ).order_by(date: :asc) }
end

