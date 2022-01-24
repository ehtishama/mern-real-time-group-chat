import { configureStore } from "@reduxjs/toolkit";
import { channelsReducer } from "./channelsSlice";
import { membersReducer } from "./membersSlice";

export const store = configureStore({
    reducer: {
        channels: channelsReducer,
        members: membersReducer
    },
});
