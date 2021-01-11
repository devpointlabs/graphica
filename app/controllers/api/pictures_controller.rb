class Api::PicturesController < ApplicationController

  def index
    # render json: Picture.search(params[:search], params[:page])
    # render json: Picture.limit(10)
    # render json: Picture.order(created_at: :desc)
    render json: Picture.search(params[:search], params[:limit], params[:offset], params[:category_id])
    # render json: Picture.limit(params[:limit]).offset(params[:offset]).order(created_at: :desc)
  end

  def search
    render json: Picture.search(params[:search], params[:page])
  end

  def show
    render json: Picture.find(params[:id])
  end

  def update
    picture = Picture.find(params[:id])
    if picture.update(picture_params)
      render json: picture
    else
      render json: { message: "Picture not updated!"}
    end  
  end

  def destroy
    Picture.find(params[:id]).destroy
    render json: {message: 'Delete Successful' }
  end

  private

  def picture_params
    params.require(:picture).permit(:views, :user_id, :category_id, :description, :url, :title, :ratio)
  end

end
