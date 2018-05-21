import React, { PureComponent } from "react";
import * as R from "ramda";
import classNames from "classnames";
import Card from "./Card.jsx";
import style from "./style.css";

class Search extends PureComponent {
  render() {
    const {
      handleInput,
      handleEnterClick,
      searchText,
      isLoading,
      isValid,
      items
    } = this.props;

    return (
      <div className={classNames(style.panel, style.search)}>
        <div
          className={classNames(style.searchWrapper, {
            [style.loading]: isLoading
          })}
        >
          <input
            onChange={e => handleInput(e)}
            onKeyUp={e => handleEnterClick(e)}
            className={style.searchInput}
            value={searchText}
            type="text"
            placeholder="Search for a song title, artist, album..."
          />
        </div>
        {!isLoading &&
          isValid && (
            <table style={{ marginTop: "20px" }} className={style.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>BPM</th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ id, title, bpm, artists, image_url }, index) => (
                  <tr key={`${index}${id}`}>
                    <td>{title}</td>
                    <td>{R.join(", ", R.map(R.prop("name"), artists))}</td>
                    <td>{Math.round(bpm)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    );
  }
}

export default Search;
