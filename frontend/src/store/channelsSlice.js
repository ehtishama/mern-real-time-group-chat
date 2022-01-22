import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChannels } from "../services/api";

const initialState = [];

// thunk
export const fetchChannelsThunk = createAsyncThunk(
    "fetchChannels",
    async (payload) => {
        const channels = await getChannels();
        return channels;
    }
);

const channelsSlice = createSlice({
    name: "channels",
    initialState,

    reducers: {
        addChannels(state, action) {
            state.push(...action.payload);
        },
    },
    extraReducers: {
        [fetchChannelsThunk.fulfilled](state, action) {
            return action.payload;
        },
    },
});

// action creators
export const { addChannels } = channelsSlice.actions;

// selectors
export const selectAllChannels = (state) => state.channels;

// reducer
export const channelsReducer = channelsSlice.reducer;
