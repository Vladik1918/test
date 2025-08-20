// src/features/trips/tripsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { TripsState } from "./types";
import { createTrip, fetchTrips } from "./tripsThunks";

const initialState: TripsState = {
  trips: [],
  loading: false,
  error: null,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips.push(action.payload);
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Create trip failed";
      })
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Fetch trips failed";
      });
  },
});

export default tripsSlice.reducer;
