import React, { Component } from "react";
import style from "../index.css";

const withThemeChange = (WrappedComponent, theme) => {
  return class extends Component {
    componentWillMount() {
      document.getElementsByTagName("body")[0].className = style[theme];
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withThemeChange;
