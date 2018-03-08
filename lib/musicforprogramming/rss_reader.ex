defmodule MusicForProgramming.RssReader do
  use ExActor.GenServer, export: __MODULE__
  require Logger

  @rss_url "http://musicforprogramming.net/rss.php"
  @update_timer 10_800_000  # 3 hours

  defstart start_link do
    Logger.debug "Started RSS reader"
    {:ok, parsed_feed} = parse_feed()
    Process.send_after __MODULE__, :update, @update_timer
    initial_state parsed_feed
  end

  defcall get, state: state, do: reply(state)

  defhandleinfo :update do
    Logger.debug "Updating RSS feed"
    {:ok, parsed_feed} = parse_feed()
    Process.send_after __MODULE__, :update, @update_timer
    new_state parsed_feed
  end

  defcast stop, do: stop_server(:normal)

  defp parse_feed do
    with {:ok, %{body: body}}     <- HTTPoison.get(@rss_url),
                {:ok, parsed, _}  <- FeederEx.parse(body)
    do
      {:ok, parsed}
    else
      {:error, err} -> err
    end
  end
end
