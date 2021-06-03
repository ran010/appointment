require 'rails_helper'

RSpec.describe Appointment, type: :model do
  it { is_expected.to be_mongoid_document }
  it { is_expected.to have_timestamps }
  it { is_expected.to belong_to(:user)}
  it { is_expected.to belong_to(:time_slot)}

  describe '.update_time_slot' do
    let(:appointment) {build(:appointment)}
    it "remove time from available time" do
      expect(appointment.time_slot.available_time.count).to eq(2)
      appointment.save
      expect(appointment.time_slot.available_time.count).to eq(1)
    end
    it "add time to reserved time" do
      expect(appointment.time_slot.reserved_time.count).to eq(0)
      appointment.save
      expect(appointment.time_slot.available_time.count).to eq(1)
    end
  end
end
