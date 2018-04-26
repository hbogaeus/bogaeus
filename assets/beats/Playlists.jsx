import React, { PureComponent } from "react";
import Playlist from "./Playlist.jsx";
import style from "./style.css";

class Playlists extends PureComponent {
  render() {
    const {
      handlePlaylistsClick,
      handlePlaylistClick,
      playlists,
      selectedPlaylist
    } = this.props;

    return (
      <div>
        <h1>Playlists!</h1>
        {window.APP.spotify_name ?
          <span>{window.APP.spotify_name}</span>
          : <a className={style.spotifyLogin} href="/beats/authorize">Login to Spotify</a>
        }
        <a onClick={() => handlePlaylistsClick()}>Playlists</a>

        <div>
          {
            playlists.map(playlist => <Playlist key={playlist.id} handlePlaylistClick={handlePlaylistClick} {...playlist} />)
          }
        </div>

        {selectedPlaylist &&
          selectedPlaylist.map(track => <div key={track.id}>{track.title} - {track.bpm}</div>)
        }

      </div>
    )
  }
}

export default Playlists;