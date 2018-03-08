defmodule BogaeusWeb.MusicForProgrammingController do
  use BogaeusWeb, :controller

  def all(conn, _params) do
    case MusicForProgramming.all_entries do
      {:ok, feed} ->
        json(conn, %{data: feed})
      {:error, error} ->
        conn
        |> put_status(500)
        |> json(%{error: error})
    end
  end
end
