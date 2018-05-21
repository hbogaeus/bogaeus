import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Playlists from "./Playlists.jsx";
import Search from "./Search.jsx";
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
      selectedPlaylistItems: null,
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
      credentials: "include",
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
      credentials: "include"
    });
  }

  playlist(playlistId, userId) {
    return fetch("/api/beats/playlist", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      credentials: "include",
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

  handlePlaylistClick(playlist) {
    const playlistId = playlist.id;
    const userId = playlist.owner.id;

    this.setState({
      selectedPlaylist: playlist
    });

    this.playlist(playlistId, userId)
      .then(response => response.json())
      .then(json =>
        this.setState({
          selectedPlaylistItems: json.items
        })
      );
  }

  render() {
    const {
      searchText,
      items,
      playlists,
      selectedPlaylistItems,
      selectedPlaylist,
      isValid,
      isLoading
    } = this.state;

    return (
      <div className={style.main}>
        {/*
        <div className={style.navlinks}>
          <NavLink to="/beats">Search</NavLink>
          <NavLink to="/beats/playlists">Playlists</NavLink>
        </div>
        */}

        <Route
          exact
          path="/beats"
          render={() => (
            <Search
              handleInput={this.handleInput}
              handleEnterClick={this.handleEnterClick}
              searchText={searchText}
              isLoading={isLoading}
              isValid={isValid}
              items={items}
            />
          )}
        />

        <Route
          path="/beats/playlists"
          render={() => (
            <Playlists
              handlePlaylistsClick={this.handlePlaylistsClick}
              handlePlaylistClick={this.handlePlaylistClick}
              playlists={playlists}
              selectedPlaylistItems={selectedPlaylistItems}
              selectedPlaylist={selectedPlaylist}
            />
          )}
        />
      </div>
    );
  }
}

export default Beats;
