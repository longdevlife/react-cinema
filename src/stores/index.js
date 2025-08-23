import { configureStore } from "@reduxjs/toolkit";

import movieSlice from "./movie/index.jsx";
import userSlice from "./user/index.js";

export const store = configureStore({
  reducer: {
    // là nơi chứa các reducer của ứng dụng
    movieSlice,
    userSlice,
  },
});
