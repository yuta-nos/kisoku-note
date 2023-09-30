class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :documents, :versions
end
