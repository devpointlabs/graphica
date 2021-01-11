class Collection < ApplicationRecord
  belongs_to :user
  has_many :collection_pictures, dependent: :destroy
  has_many :pictures, through: :collection_pictures
  validates :title, presence: true
  
  def self.search(search, limit=9, offset=0)    
    collections = Collection.where('title ILIKE ?', "%#{search}%")
    collections.limit(limit).offset(offset).order(created_at: :desc)
  end
end
