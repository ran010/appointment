30.times do |i|
  schedule = Schedule.create(date: Date.current + i.day,
                             close_time:  Time.parse('5:00PM'),
                             open_time:  Time.parse('9:00AM'),
                             appointment_interval: rand(5...30)*10)
  TimeSlot.create(schedule_id: schedule.id)
end