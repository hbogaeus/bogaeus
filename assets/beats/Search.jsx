import React, { PureComponent } from "react";
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
      <div>
        <h1>Search!</h1>
        <div className={`${style.search} ${isLoading && style.loading}`}>
          <input
            onChange={(e) => handleInput(e)}
            onKeyUp={(e) => handleEnterClick(e)}
            className={style.searchInput}
            value={searchText}
            type="text"
            placeholder="Search for a title, artist, album..."
          />
        </div>

        <div className={style.results}>
          {!isLoading &&
            isValid &&
            items.map(item => <Card key={item.id} {...item} />)}
        </div>
      </div>
    )
  }
}

export default Search;