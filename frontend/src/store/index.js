import { configureStore } from "@reduxjs/toolkit";
import { channelsReducer } from "./channelsSlice";
import { membersReducer } from "./membersSlice";
import { messagesReducer } from "./messagesSlice";

export const store = configureStore({
    reducer: {
        channels: channelsReducer,
        members: membersReducer,
        messages: messagesReducer,
    },
});
