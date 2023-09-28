class Category < ApplicationRecord
  belongs_to :team
  has_many :documents
end
