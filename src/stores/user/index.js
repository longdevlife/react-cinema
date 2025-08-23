import { createSlice } from "@reduxjs/toolkit";
import { keysLocalStorage, localStorageUtil } from "../../util/localStorage";

const initialState = {
  infoUser: localStorageUtil.get(keysLocalStorage.INFO_USER),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setInfoUserAction: (state, action) => {
      state.infoUser = action.payload;
    },

    setLogoutAction: (state) => {
      // bước 1 : xóa thông tin user trong redux
      state.infoUser = null;
      // bước 2 : xóa thông tin user trong localStorage
      localStorageUtil.remove(keysLocalStorage.INFO_USER);
    },
  },
});

export const { setInfoUserAction, setLogoutAction } = userSlice.actions;

export default userSlice.reducer;
