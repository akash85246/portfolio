import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: localStorage.getItem("id") || null,
  username: localStorage.getItem("username") || null,
  profile_picture: localStorage.getItem("profile_picture") || null,
  email: localStorage.getItem("email") || null,
  last_online: new Date().toLocaleString(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state.id = user.id;
      state.username = user.username;
      state.profile_picture = user.profile_picture;
      state.email = user.email;
      state.last_online = new Date(user.last_online).toLocaleString();
      state.type = user.type || null;
      state.created_at = user.created_at || null;

      localStorage.setItem("id", user.id);
      localStorage.setItem("username", user.username);
      localStorage.setItem("profile_picture", user.profile_picture);
      localStorage.setItem("email", user.email);
      localStorage.setItem("last_online", user.last_online);
      localStorage.setItem("type", user.type || "");
      localStorage.setItem("created_at", user.created_at || "");
    },
    clearUser: (state) => {
      state.id = null;
      state.username = "";
      state.profile_picture = "";
      state.email = "";
      state.last_online = "";
      state.type = "";
      state.created_at = "";

      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("profile_picture");
      localStorage.removeItem("email");
      localStorage.removeItem("last_online");
      localStorage.removeItem("type");
      localStorage.removeItem("created_at");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
