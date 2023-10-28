class AddNumberToVersions < ActiveRecord::Migration[7.0]
  def change
    add_column :versions, :number, :integer
  end
end
