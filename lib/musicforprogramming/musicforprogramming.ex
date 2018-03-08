defmodule MusicForProgramming do
  @moduledoc """
  Beats keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def all_entries do
    case MusicForProgramming.RssReader.get do
      %FeederEx.Feed{} = feed ->
        {:ok, Enum.reduce(feed.entries, [], fn item, acc -> [%{title: item.title, url: item.id, link: item.link} | acc] end)}
      error -> {:error, error}
    end
  end
end
