# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :bogaeus, BogaeusWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "kOTmW49BYF3uFYpAwfsDOXWvYAyjGo37uBBckx/Qjgzcc1QaiZdCl10e0BsZ009v",
  render_errors: [view: BogaeusWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Bogaeus.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :bogaeus,
  spotify_client_secret: {:system, "SPOTIFY_CLIENT_SECRET"},
  spotify_client_id: {:system, "SPOTIFY_CLIENT_ID"}

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
