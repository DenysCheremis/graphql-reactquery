import { configureStore } from "@reduxjs/toolkit";
import listSlice from "../slices/listSlice";

const store = configureStore({
    reducer: { listSlice },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
