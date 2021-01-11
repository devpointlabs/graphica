class Picture < ApplicationRecord
  belongs_to :user
  belongs_to :category

  has_many :picture_comments, dependent: :destroy
  # has_many :picture_comments, through: :users, dependent: :destroy
  has_many :collections, through: :collection_pictures
  has_many :collection_pictures, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :users, through: :favorites, dependent: :destroy
  validates :url, presence: true
  validates :title, presence: true

  def self.search(search, limit=11, offset=0, category_id)
    pictures = Picture.where('title ILIKE ?', "%#{search}%")
    pictures = where(category_id: category_id) if category_id != "null"
    pictures = pictures.limit(limit).offset(offset).order(created_at: :desc)
    pictures
  end
end
