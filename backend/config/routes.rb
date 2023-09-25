Rails.application.routes.draw do
  # get 'categories/index'
  # get 'categories/show'
  # get 'categories/create'
  # get 'categories/update'
  # get 'categories/destroy'
  
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
  }
  # ログインユーザー取得のルーティング
  namespace :auth do
    resources :sessions, only: %i[index]
  end
  
  resources :teams, only:[:create, :show, :update, :destroy]

  resources :categories
  
end
