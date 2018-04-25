import React, { Component } from "react";
import style from "../index.css";

const withThemeChange = (WrappedComponent, theme) => {
  return class extends Component {
    componentWillMount() {
      const body = document.getElementsByTagName("body")[0];
      body.className = style[theme];
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withThemeChange;
