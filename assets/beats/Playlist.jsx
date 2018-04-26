import React, { PureComponent } from "react";
import style from "./style.css";

class Playlist extends PureComponent {
  render() {
    const { id, owner, name, images, tracks, handlePlaylistClick } = this.props;

    return (
      <div onClick={() => handlePlaylistClick(id, owner.id)} className={style.card}>
        <div className={style.playlistImage} style={{ backgroundImage: `url(${images[0].url})` }} />
        <span>{name} · {tracks.total}</span>
      </div>
    )
  }
}

export default Playlist;