import React, { Component } from "react";
import Player from "./Player";

class MusicForProgramming extends Component {
  constructor() {
    super()
    this.state = {
      tracks: [],
      selectedURL: ""
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.getFeed()
      .then(response => response.json())
      .then(json => this.setState({
        tracks: json.data
      })
    );
  }

  getFeed() {
    return fetch("/api/mfp");
  }

  handleClick(audioURL) {
    this.setState({
      selectedURL: audioURL
    });
  }

  static isFresh(dateString) {
    const current = new Date();
    const publishedDate = new Date(dateString.substring(3));
    publishedDate.setDate(publishedDate.getDate() + 14);

    return publishedDate > current;
  }


  render() {
    const { tracks, selectedURL } = this.state;

    return (
      <div>
        {selectedURL ? <Player url={selectedURL}></Player> : <span>Click to play track</span>}
        {tracks.map((track) => (
          <Track
            key={track.title}
            title={track.title}
            url={track.url}
            fresh={MusicForProgramming.isFresh(track.published)}
            onClick={() => this.handleClick(track.url)}
            />
        ))}
      </div>
    )
  }
}

const Track = ({ title, url, onClick, fresh }) => <span className="track" onClick={onClick}>{title} {fresh && "FRESH!"}</span>

export default MusicForProgramming;