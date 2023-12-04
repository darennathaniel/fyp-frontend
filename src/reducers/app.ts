import { IAppState } from "@/types/user/IAppState";
import { IStatus } from "@/types/user/IStatus";
import { IUser } from "@/types/user/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAppState = {
  loading: false,
  app_state: {
    statusCode: 200,
    message: "",
    show: false,
  },
  user: {
    username: "",
    company_name: "",
    wallet_address: "",
    email: "",
    isAuthenticated: false,
    upstream: 0,
    downstream: 0,
    supply: 0,
    prerequisite: 0,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<IStatus>) {
      state.app_state = action.payload;
    },
    login(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = {
        username: "",
        company_name: "",
        wallet_address: "",
        email: "",
        isAuthenticated: false,
        upstream: 0,
        downstream: 0,
        supply: 0,
        prerequisite: 0,
      };
    },
  },
});

export const { setLoading, setError, login, logout } = appSlice.actions;
export default appSlice.reducer;
