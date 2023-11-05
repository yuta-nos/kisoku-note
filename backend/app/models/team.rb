class Team < ApplicationRecord
  has_many :users
  has_many :categories
  has_many :documents, through: :categories
end
