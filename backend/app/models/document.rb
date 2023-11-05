class Document < ApplicationRecord
  belongs_to :category, optional: true
  has_many :versions
end
