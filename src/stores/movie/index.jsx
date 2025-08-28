import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listMovie: [],
  listBanner: [],
};

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    setListMovieAction: (state, action) => {
      state.listMovie = action.payload;
    },
    setListBannerAction: (state, action) => {
      state.listBanner = action.payload;
    },
  },
});

export const { setListMovieAction, setListBannerAction } = movieSlice.actions;

export default movieSlice.reducer;
