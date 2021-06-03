require 'rails_helper'

RSpec.describe User, type: :model do
  subject { described_class.new(
    first_name: "test",
    last_name: "test",
    email: "test@test.com",
    password: "password"
  ) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end
    it "is valid with invalid first_name" do
      subject.first_name = nil
      expect(subject).to_not be_valid
    end
    it "is valid with invalid last_name" do
      subject.last_name = nil
      expect(subject).to_not be_valid
    end
    it "is valid with invalid email" do
      subject.email = nil
      expect(subject).to_not be_valid
    end
  end
end
