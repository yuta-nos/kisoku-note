class ChangeDataTypeDocNumOfDocuments < ActiveRecord::Migration[7.0]
  def change
    change_column :documents, :doc_num, :string
  end
end
