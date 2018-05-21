import React, { PureComponent } from "react";
import classNames from "classnames";
import Content from "./Content.jsx";
import style from "./style.css";

class Playlists extends PureComponent {
  componentDidMount() {
    if (window.APP.spotify_name) this.props.handlePlaylistsClick();
  }

  render() {
    const {
      handlePlaylistsClick,
      handlePlaylistClick,
      playlists,
      selectedPlaylistItems,
      selectedPlaylist
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
              <img className={style.spotifyLogo} src="/images/spotify.svg" />
              Login
            </a>
          )}

          {loggedIn && <hr />}

          {loggedIn && (
            <ul>
              {playlists.map(playlist => (
                <li
                  key={playlist.id}
                  onClick={() => handlePlaylistClick(playlist)}
                  className={classNames(style.playlist, {
                    [style.selected]:
                      selectedPlaylist && playlist.id === selectedPlaylist.id
                  })}
                >
                  <span>{playlist.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedPlaylist && (
          <Content
            selectedPlaylist={selectedPlaylist}
            selectedPlaylistItems={selectedPlaylistItems}
          />
        )}
      </div>
    );
  }
}

export default Playlists;
