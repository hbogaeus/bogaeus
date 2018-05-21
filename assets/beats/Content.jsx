import React, { PureComponent } from "react";
import * as R from "ramda";
import classNames from "classnames";
import style from "./style.css";

class Content extends PureComponent {
  render() {
    const { selectedPlaylist, selectedPlaylistItems } = this.props;
    return (
      <div className={classNames(style.panel, style.content)}>
        <div className={style.contentHeader}>
          <div
            className={style.playlistImage}
            style={{
              backgroundImage: `url(${selectedPlaylist.images[0].url})`
            }}
          />
          <div className={style.contentInformation}>
            <h1 className={style.title}>{selectedPlaylist.name}</h1>
            <span className={style.createdBy}>
              Created by{" "}
              {selectedPlaylist.owner.display_name || selectedPlaylist.owner.id}
            </span>
          </div>
        </div>
        {selectedPlaylistItems && (
          <table className={style.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>BPM</th>
              </tr>
            </thead>
            <tbody>
              {selectedPlaylistItems.map(
                ({ id, title, bpm, artists }, index) => (
                  <tr key={`${index}${id}`}>
                    <td>{title}</td>
                    <td>{R.join(", ", R.map(R.prop("name"), artists))}</td>
                    <td>{Math.round(bpm)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Content;
