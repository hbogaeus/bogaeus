defmodule BogaeusWeb.PageController do
  use BogaeusWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
