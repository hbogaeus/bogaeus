import React, { PureComponent } from "react";
import classNames from "classnames";
import style from "./style.css";

class Playlist extends PureComponent {
  render() {
    const {
      id,
      owner,
      name,
      images,
      tracks,
      selected,
      handlePlaylistClick
    } = this.props;

    return (
      <li
        onClick={() => handlePlaylistClick(id, owner.id)}
        className={classNames(style.playlist, { [style.selected]: selected })}
      >
        <span>
          {name} {selected}
        </span>
      </li>
    );
  }
}

export default Playlist;
