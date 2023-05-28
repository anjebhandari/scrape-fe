import React, { Fragment, useEffect } from 'react';
import {  Routes ,Route} from 'react-router-dom';

import Home from './app/home/index';
import WatchList from './app/watchlist';

const App = (props) => {

  return(
  <Fragment>
    <Routes >
      <Route exact path='/' element={<Home />} />
      <Route exact path='/watchlist' element={<WatchList history={props.history}/> } />
    </Routes>
    </Fragment>
)};

export default App;
