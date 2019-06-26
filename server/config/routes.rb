Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :create, :show, :update]
  resources :activities, only: [:index, :create, :update, :show, :destroy]
  # post `/users/#{user.id}`, to: 'users#show'
end
