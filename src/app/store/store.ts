// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import tripsReducer from '../../features/trips/tripsSlice';
import placesReducer from '../../features/places/placesSlice';
import inviteReducer from '../../features/inviteTrips/inviteSlice';
import accessReducer from '../../features/access/accessSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    places: placesReducer,
    invite: inviteReducer,
    access: accessReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
