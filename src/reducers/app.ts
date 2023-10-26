import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IError {
  statusCode: number;
  message: string;
  show: boolean;
}

export interface IAppState {
  loading: boolean;
  error: IError;
}

const initialState = {
  loading: false,
  error: {
    statusCode: 200,
    message: "",
    show: false,
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
  },
});

export const { setLoading, setError } = appSlice.actions;
export default appSlice.reducer;
