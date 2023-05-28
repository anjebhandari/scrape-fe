import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { searchList,store } from './watchlist.api';

export const searchByCriteria = createAsyncThunk(
    'watchlist/search',
    (formData, { rejectWithValue }) => {
        return searchList(formData)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                message.error(error.message);
                rejectWithValue(error.message);
            });
    }
);

export const add = createAsyncThunk(
    'watchlist/add',
    (formData, { rejectWithValue }) => {
        return store(formData)
            .then((response) => {
                message.success((response[0]?.return_message));
                return response;
            })
            .catch((error) => {
                message.error(error.message);
                rejectWithValue(error.message);
            });
    }
);
export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {},
    extraReducers: (builder) => {
        builder
        .addCase(searchByCriteria.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(searchByCriteria.fulfilled, (state, action) => {
            state.loading = false;
            state.payload = action.payload;
            state.pagination = {
                current: action.payload?.pagination?.page_number,
                pageSize: action.payload?.pagination?.page_size,
                total: action.payload?.pagination?.total_records,
                totalPage: action.payload?.pagination?.total_pages,
                showSizeChanger: true,
              }; 
        })
        .addCase(searchByCriteria.rejected, (state, action) => {
            state.loading = false;
        })
            .addCase(add.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(add.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(add.rejected, (state, action) => {
                state.loading = false;
        })
    }
})