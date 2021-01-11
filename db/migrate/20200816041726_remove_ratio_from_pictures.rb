class RemoveRatioFromPictures < ActiveRecord::Migration[6.0]
  def change
    remove_column :pictures, :ratio
  end
end
