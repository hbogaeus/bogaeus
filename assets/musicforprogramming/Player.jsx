import React, { Component } from "react";
import { TimeMarker, TimeMarkerType } from "react-player-controls";
import throttle from "lodash/throttle";

class Player extends Component {
  constructor(props) {
    super(props);

    this.audioIsReady = this.audioIsReady.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);

    const audio = new Audio(props.url);
    audio.addEventListener('canplay', this.audioIsReady);
    audio.addEventListener('timeupdate', throttle(this.handleTimeUpdate, 1000));

    audio.autoplay = true;

    this.state = {
      enabled: false,
      audio
    }
  }

  handleTimeUpdate(event) {
    const { audio } = this.state;
    console.dir(event);

    this.setState({
      currentTime: Math.floor(audio.currentTime)
    })
  }

  audioIsReady(event) {
    console.log("Ready!");
    console.dir(event.target);
    const { duration, currentTime } = event.target;
    this.setState({
      duration,
      currentTime
    })
  }

  render() {
    const { duration, currentTime } = this.state;

    return (
      <div>
        <TimeMarker 
        totalTime={duration}
        currentTime={currentTime}
        markerSeparator=" / "
        firstMarkerType={TimeMarkerType.ELAPSED} 
        secondMarkerType={TimeMarkerType.DURATION} 
        />

      </div>

    )
  }
}

export default Player;