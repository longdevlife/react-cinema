import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listMovie: [],
};

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    setListMovieAction: (state, action) => {
      state.listMovie = action.payload;
    },
  },
});

export const {setListMovieAction} = movieSlice.actions;

export default movieSlice.reducer;
