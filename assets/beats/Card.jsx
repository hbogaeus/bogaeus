import React, { PureComponent } from "react";
import style from "./style.css";

class Card extends PureComponent {
  render() {
    const { image_url, title, artist, bpm } = this.props;

    return (
      <div className={style.card}>
        <img className={style.cardImage} src={image_url} />
        <span className={style.cardBPM}>{Math.round(bpm)}</span>
        <span className={style.cardInfo}>{title} - {artist}</span>
      </div>
    )
  }
}

export default Card;