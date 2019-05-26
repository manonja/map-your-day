class User < ApplicationRecord
  has_many :activities, -> { order(beginning_time: :asc) }


end
