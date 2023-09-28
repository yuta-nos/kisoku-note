Rails.application.routes.draw do
  
  # devise_token_authのマウント
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
  }
  
  namespace :auth do
    # ログインユーザー取得のルーティング
    resources :sessions, only: [:index]
    # auth配下に配置、devise_token_authの機能を使用可能に
    resources :teams, only:[:create, :show, :update, :destroy]
    resources :categories
    resources :documents
  end
  
end
