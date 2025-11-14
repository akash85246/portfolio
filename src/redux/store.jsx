import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userSlice";
import IpAddressReducer from "./slices/IpAddressSlice";
import authReducer from "./slices/authSlice";
import loadingReducer from "./slices/loadingSlice";
import storiesReducer from "./slices/storySlice";

const rootReducer = combineReducers({
  user: userReducer,
  ipAddress: IpAddressReducer,
  auth: authReducer,
  loading: loadingReducer,
  stories: storiesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth", "ipAddress", "stories"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);