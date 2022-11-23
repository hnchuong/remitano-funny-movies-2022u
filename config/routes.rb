Rails.application.routes.draw do
  devise_for :users, only: [:sessions, :registrations]
  resources :movies do
    post :vote, on: :member
  end

  root to: 'home#index'
end
