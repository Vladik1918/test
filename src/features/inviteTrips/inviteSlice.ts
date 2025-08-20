import { createSlice } from "@reduxjs/toolkit";
import { sendInvite, acceptInvite, fetchInvites } from "./inviteThunks";
import type { InviteState } from "./types";

const initialState: InviteState = {
  invites: [],
  loading: false,
  error: null,
};

const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendInvite.fulfilled, (state, action) => {
        state.loading = false;
        state.invites.push(action.payload);
      })
      .addCase(sendInvite.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Send invite failed";
      })

      .addCase(fetchInvites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvites.fulfilled, (state, action) => {
        state.loading = false;
        state.invites = action.payload;
      })
      .addCase(fetchInvites.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Fetch invites failed";
      })

      .addCase(acceptInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptInvite.fulfilled, (state, action) => {
        state.loading = false;
        const invite = state.invites.find((inv) => inv.id === action.payload);
        if (invite) invite.accepted = true;
      })
      .addCase(acceptInvite.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Accept invite failed";
      });
  },
});

export const { clearError } = inviteSlice.actions;
export default inviteSlice.reducer;
