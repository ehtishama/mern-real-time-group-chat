import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages } from "../services/api";
/* 
  {
  
    channel_id1: [...messages],
    channel_id2: [...messages],
    ...
    status: "idle|loading|loaded|error"

  }
*/

export const fetchMessagesThunk = createAsyncThunk(
    "fetchMessages",
    async (payload) => {
        const { channelId } = payload;
        const messages = await getMessages(channelId);
        return { channelId, messages };
    }
);

const initialState = {
    status: "idle",
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addOneMessage(state, action) {
            const { message, channelId } = action.payload;
            state[channelId]?.push(message);
        },
    },
    extraReducers: {
        [fetchMessagesThunk.fulfilled](state, action) {
            const { channelId, messages } = action.payload;
            state[channelId] = messages;
            state.status = "loaded";
        },
        [fetchMessagesThunk.pending](state) {
            state.status = "loading";
        },
        [fetchMessagesThunk.rejected](state) {
            state.status = "error";
        },
    },
});

// selectors [state is rootState]
export const selectAllMessages = (state, channelId) =>
    state.messages[channelId];
export const selectMessagesStatus = (state) => state.messages.status;

// action creators
export const { addOneMessage } = messagesSlice.actions;

// reducer
export const messagesReducer = messagesSlice.reducer;
