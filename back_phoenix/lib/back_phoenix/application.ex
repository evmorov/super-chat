defmodule BackPhoenix.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      BackPhoenixWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: BackPhoenix.PubSub},
      # Start the Endpoint (http/https)
      BackPhoenixWeb.Endpoint
      # Start a worker by calling: BackPhoenix.Worker.start_link(arg)
      # {BackPhoenix.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: BackPhoenix.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    BackPhoenixWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
