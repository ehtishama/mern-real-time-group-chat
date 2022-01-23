import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChannels } from "../services/api";

const initialState = {
    ids: [],
    entities: {},
    selectedChannel: null,
};

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
        setSelectedChannel(state, action) {
            state.selectedChannel = action.payload;
        },

        addChannel(state, action) {
            const channel = action.payload;
            state.ids.push(channel._id);
            state.entities[channel._id] = channel;
        },
        addMember(state, action) {
            const { channelId, newMember } = action.payload;
            state.entities[channelId]?.members.push(newMember);
        },
    },
    extraReducers: {
        [fetchChannelsThunk.fulfilled](state, action) {
            const channels = action.payload;
            const ids = [];
            channels.forEach((channel) => {
                ids.push(channel._id);
                state.entities[channel._id] = channel;
            });
            state.ids = ids;
        },
    },
});

// action creators
export const { setSelectedChannel, addChannel, addMember } =
    channelsSlice.actions;

// selectors [state is root state here]
export const selectAllChannels = (state) =>
    Object.values(state.channels.entities);

export const selectChannelById = (state, channelId) =>
    state.channels.entities[channelId];

export const selectIsMember = (state, userId, channelId) =>
    state.channels.entities[channelId]?.members.includes(userId);

// reducer
export const channelsReducer = channelsSlice.reducer;
