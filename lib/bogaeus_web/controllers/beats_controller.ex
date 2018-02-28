defmodule BogaeusWeb.BeatsController do
  use BogaeusWeb, :controller

  def search(conn, %{"query" => query}) do
    data = Beats.search(query)
    json(conn, %{data: data})
  end
end