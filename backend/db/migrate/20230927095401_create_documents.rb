class CreateDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :documents do |t|
      t.integer :doc_num
      t.string :title
      t.string :body
      t.integer :category_id
      t.integer :version
      t.string :reason

      t.timestamps
    end
  end
end
