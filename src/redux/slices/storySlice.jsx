import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  ASYNC THUNK
export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async ({ userId, userToken, seen = [] }, { rejectWithValue }) => {
    const url = `https://graph.facebook.com/v23.0/${userId}/stories?fields=id,media_type,media_url,timestamp&access_token=${userToken}`;
    try {
      const response = await axios.get(url);
      let stories = response.data.data || [];

      const seenSet = new Set(seen);

      const unseenStories = stories.filter((story) => !seenSet.has(story.id));

      const seenStoriesArr = stories.filter((story) => seenSet.has(story.id));

      const prioritized = [...unseenStories, ...seenStoriesArr].slice(0, 10);

      //repeat stories to create a longer carousel effect
      //   const copies = 10;
      //   const repeated = Array(copies).fill(prioritized).flat();
      //   return repeated;

      return prioritized;
    } catch (err) {
      console.error("Error fetching stories:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    seen: [],
    loading: false,
    error: null,
  },
  reducers: {
    addSeenStory: (state, action) => {
      if (!state.seen.includes(action.payload)) {
        state.seen.push(action.payload);
      }
    },
    clearStories: (state) => {
      state.stories = [];
      state.seen = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addSeenStory, clearStories } = storiesSlice.actions;
export default storiesSlice.reducer;
