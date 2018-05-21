import React, { PureComponent } from "react";
import classNames from "classnames";
import Playlist from "./Playlist.jsx";
import style from "./style.css";

class Playlists extends PureComponent {
  componentDidMount() {
    this.props.handlePlaylistsClick();
  }

  render() {
    const {
      handlePlaylistsClick,
      handlePlaylistClick,
      playlists,
      selectedPlaylist,
      selectedPlaylistId
    } = this.props;

    const { spotify_name, profile_image_url } = window.APP;

    const loggedIn = !!spotify_name;

    return (
      <div className={style.playlists}>
        <div
          className={classNames(style.panel, style.sidebar, {
            [style.extraPaddingTop]: profile_image_url
          })}
        >
          {profile_image_url && (
            <div
              className={style.profileImage}
              style={{ backgroundImage: `url(${profile_image_url})` }}
            />
          )}

          {loggedIn ? (
            <span className={style.spotifyName}>{spotify_name}</span>
          ) : (
            <a className={style.spotifyLogin} href="/beats/authorize">
              Login to Spotify
            </a>
          )}

          {loggedIn && <hr />}

          {loggedIn && (
            <ul>
              {playlists.map(playlist => (
                <Playlist
                  key={playlist.id}
                  handlePlaylistClick={handlePlaylistClick}
                  selected={playlist.id === selectedPlaylistId}
                  {...playlist}
                />
              ))}
            </ul>
          )}
        </div>

        {selectedPlaylist &&
          selectedPlaylist.map(track => (
            <div key={track.id}>
              {track.title} - {track.bpm}
            </div>
          ))}
      </div>
    );
  }
}

export default Playlists;
