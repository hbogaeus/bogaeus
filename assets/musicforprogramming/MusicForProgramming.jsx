import React, { Component } from "react";
import Player from "./Player";

class MusicForProgramming extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      audioURL: ""
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.getFeed()
      .then(response => response.json())
      .then(json => this.setState({
        items: json.data
      })
    );
  }

  getFeed() {
    return fetch("/api/mfp");
  }

  handleClick(audioURL, e) {
    this.setState({
      audioURL
    });
  }


  render() {
    const { items, audioURL } = this.state;

    const listItems = items.map((item) => (
      <li key={item.title} onClick={(e) => this.handleClick(item.url, e)}>{item.title}</li>
    ))

    return (
      <div>
        {audioURL ? <Player url={audioURL}></Player> : <span>Click to play track</span>}
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
}

export default MusicForProgramming;