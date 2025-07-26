import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import IpAddressReducer from "./slices/IpAddressSlice";
import authReducer from "./slices/authSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    ipAddress: IpAddressReducer,
  },
});

export default store;
