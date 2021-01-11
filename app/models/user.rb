# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :pictures, dependent: :destroy
  has_many :collections, dependent: :destroy
  has_many :picture_comments
  has_many :favorites, dependent: :destroy
  #Should picture comments stay after user has been deleted? 
  #this will leave them up.

  #Devise handles validations here well enough?

  
end
