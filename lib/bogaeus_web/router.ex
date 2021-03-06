defmodule BogaeusWeb.Router do
  use BogaeusWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :fetch_session
    plug :accepts, ["json"]
  end

  scope "/api", BogaeusWeb do
    pipe_through :api

    post "/beats/search", BeatsController, :search
    get "/beats/playlists", BeatsController, :playlists
    post "/beats/playlist", BeatsController, :playlist

    get "/mfp", MusicForProgrammingController, :all
  end

  scope "/", BogaeusWeb do
    pipe_through :browser

    get "/beats/authorize", BeatsController, :authorize
    get "/beats/callback", BeatsController, :callback

    get "/*path", PageController, :index
  end
end
