// src/features/access/accessSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { AccessInvitesState, IAccessInvite } from "./types";
import { sendInvite, fetchInvites, acceptInvite } from "./accessThunk";

const initialState: AccessInvitesState = {
  invites: [],
  loading: false,
  error: null,
};

const accessSlice = createSlice({
  name: "access",
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
        const inviteWithStatus: IAccessInvite = {
          ...action.payload,
          status: action.payload.status || "pending",
        };
        state.invites.push(inviteWithStatus);
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
        state.invites = action.payload.map(inv => ({
          ...inv,
          status: inv.status || "pending",
        }));
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
        const invite = state.invites.find(
          (inv) => inv.token === action.meta.arg.token
        );
        if (invite) invite.status = "accepted";
      })
      .addCase(acceptInvite.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Accept invite failed";
      });
  },
});

export const { clearError } = accessSlice.actions;
export default accessSlice.reducer;
