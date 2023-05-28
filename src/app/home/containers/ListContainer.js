import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainPanel from '../components/MainPanel';
import * as homeSlice from '../slice/home.slice';

const ListContainer = (props) => {
    const dispatch = useDispatch();

    const homeData = useSelector((state) => state.home);
    const loading = homeData?.loading;
    const payload = homeData?.payload?.data;
    const pagination = homeData?.pagination;

    const fetchHomeList = (formData = {}) => {
        return dispatch(homeSlice.searchByCriteria(formData));
    }
    
    props = {
        ...props,
        fetchHomeList,
        loading,
        payload,
        pagination
    }
    return <MainPanel {...props} />;
}

export default ListContainer;
