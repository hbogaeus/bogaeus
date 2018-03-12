import "isomorphic-fetch";
import "./index.css";

import React from "react";
import { hot } from "react-hot-loader";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "./common/Header";

/*
import Beats from "./beats/Beats";
import MusicForProgramming from "./musicforprogramming/MusicForProgramming";
*/

const Loading = () => <h1>Loading...</h1>;

const Beats = Loadable({
  loader: () => import("./beats/Beats"),
  loading: Loading
});

const MusicForProgramming = Loadable({
  loader: () => import("./musicforprogramming/MusicForProgramming"),
  loading: Loading
});

const App = () => (
  <div>
    <Header />
    <Route key={3} path="/beats" component={Beats} />
    <Route
      key={4}
      path="/musicforprogramming"
      component={MusicForProgramming}
    />
  </div>
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

export default hot(module)(App);
