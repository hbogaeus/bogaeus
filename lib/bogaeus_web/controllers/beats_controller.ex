defmodule BogaeusWeb.BeatsController do
  use BogaeusWeb, :controller

  def search(conn, %{"query" => query}) do
    data = Beats.search(query)
    json(conn, %{data: data})
  end

  require Logger

  def playlists(conn, _params) do
    access_token = get_session(conn, :access_token)

    if access_token do
      data = Beats.playlists(access_token)
      json(conn, data)
    else
      conn
      |> put_status(:bad_request)
      |> json(%{error: "Bad request"})
    end
  end

  def playlist(conn, %{"playlistId" => playlist_id, "userId" => user_id}) do
    access_token = get_session(conn, :access_token)

    if access_token && user_id do
      data = Beats.playlist_songs(access_token, user_id, playlist_id)
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
      redirect_uri: Confex.fetch_env!(:bogaeus, :redirect_uri),
      state: oauth_state
    }

    redirect(
      conn,
      external: "https://accounts.spotify.com/authorize?" <> Plug.Conn.Query.encode(params)
    )
  end

  def callback(conn, %{"code" => code, "state" => _state}) do
    with {:ok, oauth_response} <-
           Beats.SpotifyApi.request_oauth_token(code, Confex.fetch_env!(:bogaeus, :redirect_uri)),
         {:ok, me_response} <- Beats.SpotifyApi.me(oauth_response["access_token"]) do
      conn
      |> put_session(:access_token, oauth_response["access_token"])
      |> put_session(:refresh_token, oauth_response["refresh_token"])
      |> put_session(:spotify_name, me_response["display_name"] || me_response["id"])
      |> put_session(:profile_image_url, me_response["images"] |> List.first() |> Map.get("url"))
      |> put_session(:expires_at, Timex.shift(Timex.now(), seconds: oauth_response["expires_in"]))
      |> redirect(to: "/beats/playlists")
    end
  end

  def callback(conn, %{"error" => error, "state" => state}) do
    Logger.error("#{inspect error}")
    Logger.error("#{inspect state}")

    send_resp(conn, :ok, "")
  end
end
