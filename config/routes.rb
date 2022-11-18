Rails.application.routes.draw do
  devise_for :users, only: [:sessions, :registrations]

  root to: 'home#index'
end
