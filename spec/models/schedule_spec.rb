require 'rails_helper'

RSpec.describe Schedule, type: :model do
  let(:schedule){create(:schedule)}
  let(:schedule1){create(:schedule, date: Date.tomorrow)}
  let(:schedule2){create(:schedule, date: Date.tomorrow + 10.day)}
  let(:schedule3){create(:schedule, date: Date.tomorrow + 5.day)}
  it { is_expected.to be_mongoid_document }
  it { is_expected.to have_timestamps }

  describe ".for_the_week" do
    it "returns schedule for the week" do
      [schedule, schedule1, schedule2, schedule3]
      expect(Schedule.for_the_week.count).to eq(2)
    end
    it "returns schedule for the week" do
      [schedule, schedule2]
      expect(Schedule.for_the_week.count).to eq(0)
    end
  end
end
