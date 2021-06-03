require "factory_bot_rails"

FactoryBot.define do
  factory :schedule do
    date { Date.today }
    close_time  { Time.parse('5:00PM') }
    open_time { Time.parse('9:00AM') }
    appointment_interval { 20 }
  end
end