import React, { Component } from "react";
import {
  PlayButton,
  ProgressBar,
  TimeMarker,
  TimeMarkerType
} from "react-player-controls";
import { Howl, Howler } from "howler";
import style from "./style.css";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      loaded: false,
      url: null
    };

    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.renderPos = this.renderPos.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.initalizeHowl = this.initalizeHowl.bind(this);
    this.destroyHowler = this.destroyHowler.bind(this);
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
      duration: this.howler.duration()
    });
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
    document.addEventListener("keydown", this.spacebarHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.spacebarHandler);
    if (this.howler) {
      this.destroyHowler();
    }
  }

  render() {
    const { loaded, current, duration } = this.state;
    const { track } = this.props;

    const classes = {
      elapsed: "ASDADS",
      intent: "babo",
      handle: "handloooo"
    };

    return (
      <div className={style.player}>
        <PlayButton isEnabled={loaded} onClick={this.handlePlayPause}>
          Play
        </PlayButton>
        <span>{track ? track.title : ""}</span>
        <ProgressBar
          className="HELLO WORLD"
          childClasses={classes}
          currentTime={current ? current : 0}
          totalTime={duration ? duration : 0}
          isSeekable={loaded}
        />
        <TimeMarker
          currentTime={current ? current : 0}
          totalTime={duration ? duration : 0}
          markerSeparator=" / "
          firstMarkerType={TimeMarkerType.ELAPSED}
          secondMarkerType={TimeMarkerType.DURATION}
        />
      </div>
    );
  }
}

export default Player;
