Rails.application.routes.draw do

  namespace :api do
    namespace :pictures do
      get 'search'
    end
  end
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    # resources :pictures, only: [:index], module: :search

    resources :picture_comments
    resources :categories
    resources :collection_pictures

    resources :pictures do
      resources :picture_comments, module: :pictures
      resources :collection_pictures, module: :pictures
    end

    resources :collections do
      resources :collection_pictures, module: :collections
      resources :pictures, only: [:index], module: :collections
    end

    resources :users do
      resources :favorites
      resources :pictures, module: :users
      resources :collections, module: :users
      put "profile_image", to: "users#update_profile_image"
      put "banner_image", to: "users#update_banner_image"
    end
    
    resources :collections, only: [:index] do 
      resources :pictures, only: [:index], module: :collections
    end   

    get '*other', to: 'static#index'
  end
end
