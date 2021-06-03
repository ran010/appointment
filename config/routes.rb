Rails.application.routes.draw do
  namespace :api, constaints: { format: 'json' } do
    resources :schedules, only: [:index, :show]
    resources :appointments, only: [:new, :create, :index, :destroy]
  end

  devise_for :users, controllers: {
      registrations: 'users/registrations',
      sessions: 'users/sessions'

  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'homepages#index', via: :all
  root 'homepages#index'
end
