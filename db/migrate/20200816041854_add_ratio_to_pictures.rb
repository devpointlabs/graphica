class AddRatioToPictures < ActiveRecord::Migration[6.0]
  def change
    add_column :pictures, :ratio, :float
  end
end
