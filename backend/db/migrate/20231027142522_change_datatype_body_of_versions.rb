class ChangeDatatypeBodyOfVersions < ActiveRecord::Migration[7.0]
  def change
    change_column :versions, :body, :text
  end
end
