import "isomorphic-fetch";
import "./index.css";

import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/*
import Beats from "./beats/Beats";
import MusicForProgramming from './musicforprogramming/MusicForProgramming';
*/


const Loading = () => (
  <h1>Loading...</h1>
)

const Beats = Loadable({
  loader: () => import('./beats/Beats'),
  loading: Loading
});

const MusicForProgramming = Loadable({
  loader: () => import("./musicforprogramming/MusicForProgramming"),
  loading: Loading
});

const App = () => ([
    <Link key={1} to="/beats">Beats!</Link>,
    <Link key={2} to="/musicforprogramming">Mfp</Link>,
    <Route key={3} path='/beats' component={Beats} />,
    <Route key={4} path='/musicforprogramming' component={MusicForProgramming} />,
]);

ReactDOM.render((
  <Router>
    <App />
  </Router>)
, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}