FactoryBot.define do
  factory :user do
    first_name { "test" }
    last_name { "test" }
    email { "test@test.com" }
    password {"password"}
  end
end
