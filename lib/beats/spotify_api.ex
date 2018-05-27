defmodule Beats.SpotifyApi do
  use GenServer
  import Plug.Conn.Query
  require Logger

  def init(_args) do
    Logger.debug("Started Spotify API")
    {:ok, nil}
  end

  def start_link do
    GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  end

  def handle_call(:get, _from, token) do
    Logger.debug("Replied with #{inspect(token)}.")
    {:reply, token, token}
  end

  def handle_call({:update, token}, _from, _state) do
    Logger.debug("Updated state to #{inspect(token)}.")
    {:reply, :ok, token}
  end

  def handle_info(:clear, _state) do
    Logger.debug("Cleared token.")
    {:noreply, nil}
  end

  defp encoded_id_and_secret do
    client_id = Confex.fetch_env!(:bogaeus, :spotify_client_id)
    client_secret = Confex.fetch_env!(:bogaeus, :spotify_client_secret)

    Base.encode64("#{client_id}:#{client_secret}")
  end

  defp get_client_credentials_token do
    token = GenServer.call(__MODULE__, :get)

    if token do
      {:ok, token}
    else
      {:ok, response} = request_access_token()
      new_token = response["access_token"]
      expires_in = response["expires_in"]

      GenServer.call(__MODULE__, {:update, new_token})
      Process.send_after(__MODULE__, :clear, (expires_in - 10) * 1000)

      {:ok, new_token}
    end
  end

  defp request(method, url, headers, body \\ "") do
    case HTTPoison.request(method, url, body, headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        body = Poison.decode!(body)
        {:ok, body}

      {:ok, %HTTPoison.Response{status_code: 400}} ->
        {:error, "Not found."}

      {:ok, %HTTPoison.Response{status_code: 429}} ->
        {:error, "Rate limit hit."}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, "#{inspect(reason)}"}
    end
  end

  defp request_access_token do
    url = "https://accounts.spotify.com/api/token"
    body = {:form, [grant_type: "client_credentials"]}

    headers = %{
      "Content-Type" => "application/x-www-form-urlencoded",
      "Authorization" => "Basic #{encoded_id_and_secret()}"
    }

    request(:post, url, headers, body)
  end

  def request_oauth_token(auth_code, redirect_uri) do
    url = "https://accounts.spotify.com/api/token"

    body =
      {:form,
       [
         grant_type: "authorization_code",
         code: auth_code,
         redirect_uri: redirect_uri
       ]}

    headers = %{
      "Content-Type" => "application/x-www-form-urlencoded",
      "Authorization" => "Basic #{encoded_id_and_secret()}"
    }

    request(:post, url, headers, body)
  end

  def get_playlists(access_token, offset \\ 0) do
    query_params = %{
      "limit" => 50,
      "offset" => offset
    }

    url = "https://api.spotify.com/v1/me/playlists/?" <> encode(query_params)

    headers = %{
      "Authorization" => "Bearer #{access_token}"
    }

    request(:get, url, headers)
  end

  def me(access_token) do
    url = "https://api.spotify.com/v1/me"

    headers = %{
      "Authorization" => "Bearer #{access_token}"
    }

    request(:get, url, headers)
  end

  def playlist_songs(access_token, user_id, playlist_id) do
    query_string = %{
      "fields" => "total,limit,offset,items(track(name,id,external_urls,album(images),artists))"
    }

    url =
      "https://api.spotify.com/v1/users/#{user_id}/playlists/#{playlist_id}/tracks?" <>
        encode(query_string)

    headers = %{
      "Authorization" => "Bearer #{access_token}"
    }

    request(:get, url, headers)
  end

  def search(query) do
    {:ok, token} = get_client_credentials_token()

    headers = %{
      "Authorization" => "Bearer #{token}"
    }

    query_string = %{
      "q" => query,
      "type" => "track"
    }

    url = "https://api.spotify.com/v1/search?" <> encode(query_string)

    request(:get, url, headers)
  end

  def bpms(ids) do
    {:ok, token} = get_client_credentials_token()

    headers = %{
      "Authorization" => "Bearer #{token}"
    }

    url = "https://api.spotify.com/v1/audio-features/?ids=" <> Enum.join(ids, ",")

    case HTTPoison.get(url, headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        result =
          Poison.decode!(body)
          |> Map.get("audio_features")
          |> Enum.map(& &1["tempo"])

        {:ok, result}

      {:ok, %HTTPoison.Response{status_code: 400}} ->
        {:error, "Not found."}

      {:ok, %HTTPoison.Response{status_code: 429}} ->
        {:error, "Rate limit hit."}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, "#{inspect(reason)}"}
    end
  end
end
