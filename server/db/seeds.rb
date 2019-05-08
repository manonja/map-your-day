# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'


30.times do 
    user =User.create(
        username: Faker::Name.name
      )
  
      activity = Activity.create(
      name: Faker::Lorem.sentence(3),
      beginning_time: Faker::Number.between(01, 24),
      end_time: Faker::Number.between(01, 24),
      location: Faker::Address.full_address,
      user_id: user.id
      )
    
end
   