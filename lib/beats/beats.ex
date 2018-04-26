defmodule Beats do
  @moduledoc """
  Beats keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """
  alias Beats.SpotifyApi

  require Logger

  def search(query) do
    with {:ok, result} <- SpotifyApi.search(query),
         song_ids <- Enum.map(result["tracks"]["items"], & &1["id"]),
         {:ok, bpms} <- SpotifyApi.bpms(song_ids) do
      zipped_results = Enum.zip(result["tracks"]["items"], bpms)

      Enum.map(zipped_results, fn {item, bpm} ->
        %{
          id: item["id"],
          bpm: bpm,
          href: get_in(item, ["external_urls", "spotify"]),
          title: item["name"],
          artist:
            get_in(item, ["artists", fn :get, data, _next -> Map.get(hd(data), "name") end]),
          image_url:
            get_in(item, [
              "album",
              "images",
              fn :get, data, _next -> Map.get(Enum.at(data, 2), "url") end
            ])
        }
      end)
    else
      {:error, error} ->
        {:error, error}
    end
  end

  def playlists(access_token) do
    {:ok, data} = SpotifyApi.get_playlists(access_token)

    %{
      items: data["items"],
      limit: data["limit"],
      offset: data["offset"],
      total: data["total"]
    }
  end

  def playlist_songs(access_token, user_id, playlist_id) do
    with {:ok, data} <- SpotifyApi.playlist_songs(access_token, user_id, playlist_id),
         song_ids <- Enum.map(data["items"], fn item -> item["track"]["id"] end),
         {:ok, bpms} <- SpotifyApi.bpms(song_ids) do
      items =
        data
        |> Map.get("items")
        |> Enum.map(&Map.get(&1, "track"))
        |> Enum.zip(bpms)
        |> Enum.map(fn {song, bpm} ->
          %{
            id: song["id"],
            title: song["name"],
            images: song["album"]["images"],
            artists: song["artists"],
            href: song["external_urls"]["spotify"],
            bpm: bpm
          }
        end)

      %{
        items: items,
        limit: data["limit"],
        offset: data["offset"],
        total: data["total"]
      }
    end
  end
end
