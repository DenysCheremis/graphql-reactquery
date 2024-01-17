import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTodos: [],
};

const listSlice = createSlice({
    name: "listSlice",
    initialState,
    reducers: {
        doubleTodos: (state) => {
            state.allTodos = [1, 2, 2];
        },
    },
});

const { reducer, actions } = listSlice;

export default reducer;
export const { doubleTodos } = actions;
