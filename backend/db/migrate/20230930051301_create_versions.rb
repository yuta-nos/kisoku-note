class CreateVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :versions do |t|
      t.integer :document_id
      t.string :body
      t.text :reason

      t.timestamps
    end
  end
end
