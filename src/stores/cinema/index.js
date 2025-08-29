import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cinemaSystemList: [],
  selectedCinemaSystem: null,
  cinemaShowtimes: [],
  loading: false,
};

const cinemaSlice = createSlice({
  name: "cinemaSlice",
  initialState,
  reducers: {
    setCinemaSystemListAction: (state, action) => {
      state.cinemaSystemList = action.payload;
    },
    setSelectedCinemaSystemAction: (state, action) => {
      state.selectedCinemaSystem = action.payload;
    },
    setCinemaShowtimesAction: (state, action) => {
      state.cinemaShowtimes = action.payload;
    },
    setLoadingAction: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCinemaSystemListAction,
  setSelectedCinemaSystemAction,
  setCinemaShowtimesAction,
  setLoadingAction,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
