import { createSlice } from "@reduxjs/toolkit";
import type { PlacesState } from "./types";
import { addPlace, fetchPlaces,  updatePlace,  deletePlace} from "./placesThunks";

const initialState: PlacesState = {
  places: [],
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.places.push(action.payload);
      })
      .addCase(addPlace.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        const index = state.places.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.places[index] = action.payload;
      })
      .addCase(updatePlace.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.places = state.places.filter(p => p.id !== action.payload);
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default placesSlice.reducer;
