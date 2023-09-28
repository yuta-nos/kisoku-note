class Document < ApplicationRecord
  belongs_to :category, optional: true
end
