import React, { PureComponent } from "react";
import style from "./style.css";

class Card extends PureComponent {
  render() {
    const { image_url, title, artist, bpm } = this.props;

    return (
      <div className={style.card}>
        <img className={style.cardImage} src={image_url} />
        <div className={style.cardContent}>
          <p>
            <span><strong>{title} - {artist}</strong></span>
            <br />
            <span className="is-size-5">{Math.round(bpm)} BPM</span>
          </p>
        </div>
      </div>
    )
  }
}

export default Card;