import React, { Component } from "react";
import Player from "./Player";
import style from "./style";

class MusicForProgramming extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      selectedTrack: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.getFeed()
      .then(response => response.json())
      .then(json =>
        this.setState({
          tracks: json.data
        })
      );
  }

  getFeed() {
    return fetch("/api/mfp");
  }

  handleClick(track) {
    this.setState({
      selectedTrack: track
    });
  }

  static isFresh(dateString) {
    const current = new Date();
    const publishedDate = new Date(dateString.substring(3));
    publishedDate.setDate(publishedDate.getDate() + 14);

    return publishedDate > current;
  }

  render() {
    const { tracks, selectedTrack } = this.state;

    return (
      <div className={style.main}>
        <Player track={selectedTrack} />
        <div className={style.tracks}>
          {tracks.map(track => (
            <Track
              key={track.title}
              title={track.title}
              url={track.url}
              fresh={MusicForProgramming.isFresh(track.published)}
              onClick={() => this.handleClick(track)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const Track = ({ title, url, onClick, fresh }) => (
  <span className={style.track} onClick={onClick}>
    {title} {fresh && "FRESH!"}
  </span>
);

export default MusicForProgramming;
