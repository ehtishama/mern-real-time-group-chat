import { configureStore } from "@reduxjs/toolkit";
import { channelsReducer } from "./channelsSlice";

export const store = configureStore({
    reducer: {
        channels: channelsReducer,
    },
});
