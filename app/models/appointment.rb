class Appointment
  include Mongoid::Document
  include Mongoid::Timestamps

  field :book_time,  type: String
  belongs_to :user
  belongs_to :time_slot

  after_save :update_time_slot

  def update_time_slot
    available_time = self.time_slot.available_time
    available_time.delete(book_time)
    time_slot.update(available_time: available_time, reserved_time: time_slot.reserved_time.push(book_time))
  end
end