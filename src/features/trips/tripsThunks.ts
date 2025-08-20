// src/features/trips/tripsThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../api/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import type { ITrip } from "./types";

export const createTrip = createAsyncThunk<
  ITrip,
  { title: string; description?: string; startDate?: string; endDate?: string; ownerId: string }
>(
  "trips/create",
  async ({ title, description, startDate, endDate, ownerId }, { rejectWithValue }) => {
    try {
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        return rejectWithValue("Start date cannot be later than end date");
      }

      const tripData: Omit<ITrip, "id"> = {
        title,
        description,
        ownerId,
        collaborators: [],  
        startDate,
        endDate,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "trips"), tripData);

      return { id: docRef.id, ...tripData };
    } catch (error: any) {
      return rejectWithValue(error.message || "Create trip failed");
    }
  }
);

export const fetchTrips = createAsyncThunk<ITrip[], { userId: string }>(
  "trips/fetch",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const tripsCol = collection(db, "trips");

      const qOwner = query(tripsCol, where("ownerId", "==", userId));
      const qCollaborator = query(tripsCol, where("collaborators", "array-contains", userId));

      const [ownerSnapshot, collaboratorSnapshot] = await Promise.all([
        getDocs(qOwner),
        getDocs(qCollaborator),
      ]);

      const trips: ITrip[] = [];

      ownerSnapshot.forEach(doc => {
        const data = doc.data() as Omit<ITrip, "id">;
        trips.push({ id: doc.id, ...data });
      });

      collaboratorSnapshot.forEach(doc => {
        const data = doc.data() as Omit<ITrip, "id">;
        if (!trips.find(t => t.id === doc.id)) {
          trips.push({ id: doc.id, ...data });
        }
      });

      return trips;
    } catch (error: any) {
      return rejectWithValue(error.message || "Fetch trips failed");
    }
  }
);
