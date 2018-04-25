defmodule BogaeusWeb.BeatsController do
  use BogaeusWeb, :controller

  def search(conn, %{"query" => query}) do
    data = Beats.search(query)
    json(conn, %{data: data})
  end

  require Logger

  def playlists(conn, _params) do
    access_token = get_session(conn, :access_token)
    Logger.error("#{inspect access_token}")

    if access_token do
      data = Beats.playlists(access_token)
      json(conn, data)
    else
      conn
      |> put_status(:bad_request)
      |> json(%{error: "Bad request"})
    end
  end

  def authorize(conn, _params) do
    oauth_state = :crypto.strong_rand_bytes(20) |> Base.url_encode64() |> binary_part(0, 20)

    conn = assign(conn, :spotify_oauth_state, oauth_state)

    params = %{
      client_id: Confex.fetch_env!(:bogaeus, :spotify_client_id),
      response_type: "code",
      scope:
        "playlist-read-collaborative playlist-read-private streaming user-read-birthdate user-read-email user-read-private",
      redirect_uri: "http://b72fa936.ngrok.io/beats/callback",
      state: oauth_state
    }

    # beats_url(BogaeusWeb.Endpoint, :callback)

    redirect(
      conn,
      external: "https://accounts.spotify.com/authorize?" <> Plug.Conn.Query.encode(params)
    )
  end

  def callback(conn, %{"code" => code, "state" => _state}) do
    case Beats.SpotifyApi.request_oauth_token(code, "http://b72fa936.ngrok.io/beats/callback") do
      {:ok,
       %{
         "access_token" => access_token,
         "refresh_token" => refresh_token,
         "expires_in" => expires_in
       }} ->
        conn
        |> put_session(:access_token, access_token)
        |> put_session(:refresh_token, refresh_token)
        |> put_session(:expires_at, Timex.shift(Timex.now(), seconds: expires_in))
        |> redirect(to: "/beats")
    end
  end

  def callback(conn, %{"error" => error, "state" => state}) do
    Logger.error("#{inspect error}")
    Logger.error("#{inspect state}")

    send_resp(conn, :ok, "")
  end
end
