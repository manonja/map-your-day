class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :activities
end
