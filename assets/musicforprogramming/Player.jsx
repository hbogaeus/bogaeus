import React, { Component } from "react";
import { TimeMarker, TimeMarkerType } from "react-player-controls";
import { Howl, Howler } from "howler";
import throttle from "lodash/throttle";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false
    }

    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.renderPos = this.renderPos.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);

    this.howler = new Howl({
      src: props.url,
      html5: true,
      onload: this.handleOnLoad,
      onplay: this.handleOnPlay
    });
  }

  handleOnPlay() {
    this.setState({
      playing: true
    })
    this.renderPos()
  }

  handlePlayPause() {
    if (this.state.playing) {
      this.howler.pause();
      this.setState({
        playing: false
      })
    } else {
      this.howler.play();
      this.setState({
        playing: true
      });
    }
  }

  handleOnLoad() {
    this.setState({
      duration: this.howler.duration()
    })
  }

  renderPos() {
    this.setState({
      current: this.howler.seek()
    })
    if (this.state.playing) {
      this._raf = requestAnimationFrame(this.renderPos);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._raf);
    this.howler.off();
    this.howler.stop();
    this.howler.unload();
    this.howler = null;
  }

  render() {
    const { current, duration } = this.state;
    return (
      <div>
        <button onClick={this.handlePlayPause}>Play</button>
        <TimeMarker 
        currentTime={current ? current : 0}
        totalTime={duration ? duration : 0}
        markerSeparator=" / "
        firstMarkerType={TimeMarkerType.ELAPSED} 
        secondMarkerType={TimeMarkerType.DURATION} 
        />
      </div>
    )
  }
}

export default Player;