Rails.application.routes.draw do
  # get 'teams/show'
  # get 'teams/create'
  # get 'teams/update'
  # get 'teams/destroy'
  mount_devise_token_auth_for 'User', at: 'auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :teams, only:[:create, :show, :update, :destroy]
  # Defines the root path route ("/")
  # root "articles#index"
end
