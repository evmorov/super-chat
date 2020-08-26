# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :back_phoenix, BackPhoenixWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "uikUF2yH2dQqGooyk4Sx4hAYHKBcGJKSiUbJAHwH71gctNgIrq8H8D3P8sOVi/Pc",
  render_errors: [view: BackPhoenixWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: BackPhoenix.PubSub,
  live_view: [signing_salt: "53+p4NnK"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
