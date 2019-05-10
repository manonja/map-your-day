class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :activities
  # class ActivitySerializer < ActiveModel::Serializer
  #   attributes :id, :name, :beginning_time, :end_time, :location
  # end
end
