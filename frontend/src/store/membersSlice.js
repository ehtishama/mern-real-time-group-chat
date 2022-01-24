import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMembers } from "../services/api";

/* 
  state shape
  {
    channelId: [...members]
  }
*/

const initialState = {};

// thunk
export const fetchMembersThunk = createAsyncThunk(
    "fetchMembersThunk",
    async (payload) => {
        const { channelId } = payload;


        const members = await getMembers(channelId);

        return { channelId, members };
    }
);

const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMembersThunk.fulfilled](state, action) {
            const { channelId, members } = action.payload;
            state[channelId] = members;
        },
    },
});


// selectors [state is rootState]
export const selectChannelMembers = (state, channelId) => state.members[channelId]

// action creators

// reducer
export const membersReducer = membersSlice.reducer;
