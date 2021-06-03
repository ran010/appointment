FactoryBot.define do
  factory :appointment do
    book_time { '09:00AM - 09:30AM' }
    user
    time_slot
  end
end
