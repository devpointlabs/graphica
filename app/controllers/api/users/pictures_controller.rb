class Api::Users::PicturesController < ApplicationController
  before_action :set_user

  def index
    render json: @user.pictures.order(created_at: :desc) 
  end

  def create
    picture = @user.pictures.new(picture_query_params)
    file = params[:file]

    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        picture.url = cloud_image['secure_url']

        if picture.save
          render json: picture
        else
          render json: { errors: picture.errors }, status: 422
        end
        
      rescue => e
        render json: { errors: e }, status: 422
      end
    end
  end

  

  def update
    picture = Picture.find(params[:id])

    if picture.update(picture_params)
      render json: picture
    else 
      render json: { errors: picture.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
    Picture.find(params[:id]).destroy
    render json: { message: 'Picture deleted' }
  end

  private
  
  def picture_params
    params.require(:picture).permit(:url, :views, :title, :description, :user_id, :category_id, :ratio)
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  def picture_query_params
    params.permit(:title, :description, :category_id, :ratio)
  end
end
