import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../components/Main';
import * as watchlistSlice from '../slice/watchlist.slice';
import * as homeSlice from '.././../home/slice/home.slice';

const ListContainer = (props) => {
    const dispatch = useDispatch();
    
    const watchlist = useSelector((state) => state.watchlist);
    const loading = watchlist?.loading;
    const payload = watchlist?.payload?.data;
    const pagination = watchlist?.pagination;
    const homelist = useSelector((state) => state.watchlist.payload);

    const fetchWatchList = (formData = {}) => {
        return dispatch(watchlistSlice.searchByCriteria(formData));
    }

    const searchHomeList = (formData) => {
        return dispatch(homeSlice.searchByCriteria(formData));
    }

    const add = (formData) => {
        return dispatch(watchlistSlice.add(formData));
    }

    props = {
        ...props,
        fetchWatchList,
        loading,
        payload,
        pagination,
        searchHomeList,
        add
    }
    return <Main {...props} />;
}

export default ListContainer;
