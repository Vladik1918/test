import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types";
import { loginUser, registerUser } from "./authThunks";

const initialState: AuthState = {
  user: null,
  idToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.idToken = null;
      localStorage.removeItem("idToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.idToken = action.payload.idToken;
        localStorage.setItem("idToken", action.payload.idToken);
      })
      // .addCase(registerUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || "Registration failed";
      // })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.idToken = action.payload.idToken;
        localStorage.setItem("idToken", action.payload.idToken);
      })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || "Login failed";
      // })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Registration failed";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
