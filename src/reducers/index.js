import { combineReducers } from 'redux';

import { homeSlice } from '../app/home/slice/home.slice';
import { watchlistSlice } from '../app/watchlist/slice/watchlist.slice';

const rootReducer = combineReducers({
    home: homeSlice.reducer,
    watchlist: watchlistSlice.reducer
});

export default rootReducer;
