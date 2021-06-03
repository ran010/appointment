FactoryBot.define do
  factory :time_slot do
    available_time {['09:00AM - 09:30AM','10:00AM - 10:30AM']}
    reserved_time { []}
    schedule
  end
end
