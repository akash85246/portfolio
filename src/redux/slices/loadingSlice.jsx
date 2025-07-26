import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};
const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearLoading: (state) => {
            state.isLoading = false;
        }
    }
});
export const { setLoading, clearLoading } = loadingSlice.actions;
export default loadingSlice.reducer;