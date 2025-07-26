import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ipAddress: localStorage.getItem("ipAddress") || null,
};

const IpAddressSlice = createSlice({
    name: "ipAddress",
    initialState,
    reducers: {
        setIpAddress: (state, action) => {
            const ipAddress = action.payload;
            state.ipAddress = ipAddress;
            localStorage.setItem("ipAddress", ipAddress);
        },
        clearIpAddress: (state) => {
            state.ipAddress = null;
            localStorage.removeItem("ipAddress");
        }
    }
});
export const { setIpAddress, clearIpAddress } = IpAddressSlice.actions;
export default IpAddressSlice.reducer;