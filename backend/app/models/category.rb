class Category < ApplicationRecord
  belongs_to :team
  has_many :documents
  has_many :versions, through: :documents
end
