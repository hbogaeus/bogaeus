defmodule BogaeusWeb.PageController do
  use BogaeusWeb, :controller

  require Logger

  def index(conn, _params) do
    spotify_name = get_session(conn, :spotify_name)
    token = get_session(conn, :access_token)
    profile_image_url = get_session(conn, :profile_image_url)

    render(
      conn,
      "index.html",
      spotify_name: spotify_name,
      access_token: token,
      profile_image_url: profile_image_url
    )
  end
end
