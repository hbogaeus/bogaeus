defmodule BogaeusWeb.PageController do
  use BogaeusWeb, :controller

  require Logger

  def index(conn, _params) do
    token = get_session(conn, :access_token)

    render(conn, "index.html", access_token: token)
  end
end
