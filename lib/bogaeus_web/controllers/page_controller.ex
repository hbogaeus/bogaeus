defmodule BogaeusWeb.PageController do
  use BogaeusWeb, :controller

  require Logger

  def index(conn, _params) do
    spotify_name = get_session(conn, :spotify_name)
    token = get_session(conn, :access_token)

    render(conn, "index.html", spotify_name: spotify_name, access_token: token)
  end
end
