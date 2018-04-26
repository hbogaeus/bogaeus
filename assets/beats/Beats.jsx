import React, { Component } from "react";
import Card from "./Card.jsx";
import Playlist from "./Playlist.jsx";
import withThemeChange from "../common/withThemeChange";
import style from "./style.css";

class Beats extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      isLoading: false,
      isValid: false,
      items: [],
      playlists: [],
      selectedPlaylist: null
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleEnterClick = this.handleEnterClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePlaylistsClick = this.handlePlaylistsClick.bind(this);
    this.handlePlaylistClick = this.handlePlaylistClick.bind(this);
  }

  handleInput(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleEnterClick(event) {
    event.preventDefault();

    if (event.keyCode === 13) {
      this.handleSearchClick();
    }
  }

  handleSearchClick() {
    const { searchText, isValid, isLoading } = this.state;

    if (!isLoading && searchText) {
      this.setState({
        isLoading: true,
        isValid: false
      });

      this.search(searchText)
        .then(response => response.json())
        .then(json =>
          this.setState({
            items: json.data,
            isValid: true,
            isLoading: false
          })
        );
    }
  }

  search(query) {
    return fetch("/api/beats/search", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      credentials: 'include',
      body: JSON.stringify({ query: query })
    });
  }

  playlists() {
    return fetch("/api/beats/playlists", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      credentials: 'include'
    });
  }

  playlist(playlistId, userId) {
    return fetch("/api/beats/playlist", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      credentials: 'include',
      body: JSON.stringify({ playlistId: playlistId, userId: userId })
    });
  }

  handlePlaylistsClick() {
    this.playlists()
      .then(response => response.json())
      .then(json =>
        this.setState({
          playlists: json.items
        })
      );
  }

  handlePlaylistClick(playlistId, userId) {
    this.playlist(playlistId, userId)
      .then(response => response.json())
      .then(json =>
        console.log(json)
      );
  }

  render() {
    const { searchText, items, playlists, selectedPlaylist, isValid, isLoading } = this.state;

    return (
      <div className={style.main}>
        <h1 className={style.title}>Beats</h1>
        <div className={`${style.search} ${isLoading && style.loading}`}>
          <input
            onChange={this.handleInput}
            onKeyUp={this.handleEnterClick}
            className={style.searchInput}
            value={searchText}
            type="text"
            placeholder="Search for a title, artist, album..."
          />

        </div>
        {!window.APP.spotify_name ?
          <span>{window.APP.spotify_name}</span>
          : <a className={style.spotifyLogin} href="/beats/authorize">Login to Spotify</a>
        }
        <a onClick={this.handlePlaylistsClick}>Playlists</a>
        <div>
          {
            playlists.map(playlist => <Playlist key={playlist.id} handlePlaylistClick={this.handlePlaylistClick} {...playlist} />)
          }
        </div>


        <div className={style.results}>
          {!isLoading &&
            isValid &&
            items.map(item => <Card key={item.id} {...item} />)}
        </div>
      </div>
    );
  }
}

export default withThemeChange(Beats, "beats");
