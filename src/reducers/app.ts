import { IAppState } from "@/types/user/IAppState";
import { IError } from "@/types/user/IError";
import { IUser } from "@/types/user/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAppState = {
  loading: false,
  error: {
    statusCode: 200,
    message: "",
    show: false,
  },
  user: {
    username: "",
    display_name: "",
    wallet_address: "",
    email: "",
    isAuthenticated: false,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<IError>) {
      state.error = action.payload;
    },
    login(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = {
        username: "",
        display_name: "",
        wallet_address: "",
        email: "",
        isAuthenticated: false,
      };
    },
  },
});

export const { setLoading, setError, login, logout } = appSlice.actions;
export default appSlice.reducer;
