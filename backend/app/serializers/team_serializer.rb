class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :users, :categories, :documents
end
