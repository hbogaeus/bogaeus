import React, { Component } from "react";
import {
  PlayButton,
  PauseButton,
  ProgressBar,
  FormattedTime,
  VolumeSlider,
  ControlDirection
} from "react-player-controls";
import { Howl, Howler } from "howler";
import style from "./style.css";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      loaded: false,
      volume: 0.0,
      url: null
    };

    this.handleVolume = this.handleVolume.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.renderPos = this.renderPos.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.initalizeHowl = this.initalizeHowl.bind(this);
    this.destroyHowler = this.destroyHowler.bind(this);
    this.spacebarHandler = this.spacebarHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.track != this.props.track) {
      this.initalizeHowl(nextProps.track.url);
    }
  }

  handleOnPlay() {
    this.setState({
      playing: true
    });
    this.renderPos();
  }

  handlePlayPause() {
    if (this.state.playing) {
      this.howler.pause();
      this.setState({
        playing: false
      });
    } else {
      this.howler.play();
      this.setState({
        playing: true
      });
    }
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
      playing: false,
      duration: this.howler.duration()
    });
    this.handlePlayPause();
  }

  renderPos() {
    this.setState({
      current: this.howler.seek()
    });
    if (this.state.playing) {
      this._raf = requestAnimationFrame(this.renderPos);
    }
  }

  initalizeHowl(url) {
    if (this.howler) this.destroyHowler();

    this.howler = new Howl({
      src: url,
      html5: true,
      onload: this.handleOnLoad,
      onplay: this.handleOnPlay
    });
  }

  destroyHowler() {
    cancelAnimationFrame(this._raf);
    this.howler.off();
    this.howler.stop();
    this.howler.unload();
    this.howler = null;
  }

  spacebarHandler(e) {
    if (event.key == " " || event.key == "Spacebar") {
      e.preventDefault();
      this.handlePlayPause();
    }
  }

  componentWillMount() {
    //document.addEventListener("keydown", this.spacebarHandler);
  }

  componentWillUnmount() {
    // document.removeEventListener("keydown", this.spacebarHandler);
    if (this.howler) {
      this.destroyHowler();
    }
  }

  handleVolume(volume) {
    console.log(volume);
  }

  render() {
    const { playing, loaded, current, duration } = this.state;
    const { track } = this.props;

    return (
      <div className={style.player}>
        {playing ? (
          <PauseButton
            className={style.playButton}
            isEnabled={loaded}
            onClick={this.handlePlayPause}
          />
        ) : (
          <PlayButton
            className={style.playButton}
            isEnabled={loaded}
            onClick={this.handlePlayPause}
          />
        )}
        <span className={style.currentlyPlaying}>
          {track ? track.title : "Music For Programming"}
        </span>
        <div className={style.progressBarWrapper}>
          <FormattedTime numSeconds={current ? current : 0} />
          <ProgressBar
            className={style.bar}
            childClasses={{
              elapsed: style.elapsed,
              intent: style.intent,
              handle: style.handle,
              seek: style.seek
            }}
            currentTime={current ? current : 0}
            totalTime={duration ? duration : 0}
            isSeekable={loaded}
          />
          <FormattedTime numSeconds={duration ? duration : 0} />
        </div>
        <VolumeSlider
          className={style.bar}
          childClasses={{
            value: style.value,
            intent: style.intent,
            handle: style.handle
          }}
          isEnabled={true}
          direction={ControlDirection.HORIZONTAL}
          volume={this.state.volume}
          onVolumeChange={this.handleVolume}
        />
      </div>
    );
  }
}

export default Player;
