class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :title, :doc_num, :versions
end
