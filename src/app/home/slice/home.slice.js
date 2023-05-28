import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { searchList } from './home.api';

export const searchByCriteria = createAsyncThunk(
    'home/search',
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

export const homeSlice = createSlice({
    name: 'home',
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
    }
})