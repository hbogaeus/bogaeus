defmodule BogaeusWeb.PageController do
  use BogaeusWeb, :controller

  require Logger

  def index(conn, _params) do
    spotify_name = get_session(conn, :spotify_name)

    render(conn, "index.html", spotify_name: spotify_name)
  end
end
