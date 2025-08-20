import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
   
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;
