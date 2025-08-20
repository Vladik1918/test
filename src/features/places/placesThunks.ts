import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../api/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";
import type { IPlace } from "./types";

export const addPlace = createAsyncThunk<
  IPlace,
  { tripId: string; locationName: string; notes?: string; dayNumber: number }
>("places/add", async ({ tripId, locationName, notes, dayNumber }, { rejectWithValue }) => {
  if (dayNumber < 1) return rejectWithValue("dayNumber must be ≥ 1");

  try {
    const placeData = { tripId, locationName, notes, dayNumber };
    const docRef = await addDoc(collection(db, "places"), placeData);
    return { id: docRef.id, ...placeData };
  } catch (error: any) {
    return rejectWithValue(error.message || "Add place failed");
  }
});


export const fetchPlaces = createAsyncThunk<IPlace[], { tripId: string }>(
  "places/fetch",
  async ({ tripId }, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "places"),
        where("tripId", "==", tripId),
        orderBy("dayNumber", "asc")
      );
      const snapshot = await getDocs(q);
      const places: IPlace[] = [];
      snapshot.forEach(doc => {
        const data = doc.data() as Omit<IPlace, "id">;
        places.push({ id: doc.id, ...data });
      });
      return places;
    } catch (error: any) {
      return rejectWithValue(error.message || "Fetch places failed");
    }
  }
);

export const updatePlace = createAsyncThunk<
  IPlace,
  { id: string; locationName?: string; notes?: string; dayNumber?: number }
>("places/update", async ({ id, locationName, notes, dayNumber }, { rejectWithValue }) => {
  try {
    const docRef = doc(db, "places", id);
    const updatedData: any = {};
    if (locationName !== undefined) updatedData.locationName = locationName;
    if (notes !== undefined) updatedData.notes = notes;
    if (dayNumber !== undefined) {
      if (dayNumber < 1) return rejectWithValue("dayNumber must be ≥ 1");
      updatedData.dayNumber = dayNumber;
    }
    await updateDoc(docRef, updatedData);
    return { id, ...updatedData } as IPlace;
  } catch (error: any) {
    return rejectWithValue(error.message || "Update place failed");
  }
});

export const deletePlace = createAsyncThunk<string, { id: string }>(
  "places/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "places", id));
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Delete place failed");
    }
  }
);
