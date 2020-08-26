defmodule BackPhoenixWeb.RoomChannel do
  use BackPhoenixWeb, :channel

  @impl true
  def join("room:lobby", payload, socket) do
    if authorized?(payload) do
      socket = socket |> assign(:nickname, payload["nickname"])
      response_payload = %{user_id: random_id()}
      {:ok, response_payload, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("new_message", payload, socket) do
    broadcast(
      socket,
      "new_message",
      %{
        nickname: socket.assigns.nickname,
        message: payload["message"],
        time: DateTime.utc_now()
      }
    )

    response_payload = %{message_id: random_id()}

    {:reply, {:ok, response_payload}, socket}
  end

  defp authorized?(%{"nickname" => nickname}) do
    nickname_valid?(nickname)
  end

  defp authorized?(_), do: false

  defp nickname_valid?(''), do: false
  defp nickname_valid?(nickname) when byte_size(nickname) > 0, do: true
  defp nickname_valid?(_), do: false

  # temporally until persistence is implemented
  defp random_id() do
    UUID.uuid4()
  end
end
