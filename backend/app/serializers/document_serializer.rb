class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :title, :doc_num, :category, :versions
end
