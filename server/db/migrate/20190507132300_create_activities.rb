class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.string :name
      t.integer :beginning_time
      t.integer :end_time
      t.string :location
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
