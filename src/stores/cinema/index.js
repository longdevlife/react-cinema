import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cinemaSystemList: [],
  selectedCinemaSystem: null,
  cinemaComplexList: [],
  selectedCinemaComplex: null,
  cinemaShowtimes: [],
  loading: false,
  loadingComplex: false,
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
    setCinemaComplexListAction: (state, action) => {
      state.cinemaComplexList = action.payload;
    },
    setSelectedCinemaComplexAction: (state, action) => {
      state.selectedCinemaComplex = action.payload;
    },
    setCinemaShowtimesAction: (state, action) => {
      state.cinemaShowtimes = action.payload;
    },
    setLoadingAction: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingComplexAction: (state, action) => {
      state.loadingComplex = action.payload;
    },
  },
});

export const {
  setCinemaSystemListAction,
  setSelectedCinemaSystemAction,
  setCinemaComplexListAction,
  setSelectedCinemaComplexAction,
  setCinemaShowtimesAction,
  setLoadingAction,
  setLoadingComplexAction,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
