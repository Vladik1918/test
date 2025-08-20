// src/features/access/accessThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../api/firebase";
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import type { IAccessInvite } from "./types";

// Надсилаємо інвайт
export const sendInvite = createAsyncThunk<IAccessInvite, { tripId: string; email: string }>(
  "access/sendInvite",
  async ({ tripId, email }, { rejectWithValue }) => {
    try {
      const invitesCol = collection(db, "invites");
      const q = query(invitesCol, where("tripId", "==", tripId), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) return rejectWithValue("Active invite already exists");

      const token = uuidv4();
      const now = new Date().toISOString();
      const inviteData = {
        tripId,
        email,
        token,
        status: "pending" as const,
        createdAt: now,
      };

      const docRef = await addDoc(invitesCol, inviteData);

      return { id: docRef.id, ...inviteData };
    } catch (error: any) {
      return rejectWithValue(error.message || "Send invite failed");
    }
  }
);

// Отримати всі інвайти для поїздки
export const fetchInvites = createAsyncThunk<IAccessInvite[], { tripId: string }>(
  "access/fetchInvites",
  async ({ tripId }, { rejectWithValue }) => {
    try {
      const invitesCol = collection(db, "invites");
      const q = query(invitesCol, where("tripId", "==", tripId));
      const snapshot = await getDocs(q);

      const invites: IAccessInvite[] = snapshot.docs.map(docSnap => {
        const data = docSnap.data() as any;
        return {
          id: docSnap.id,
          tripId: data.tripId,
          email: data.email,
          token: data.token,
          status: data.status || "pending",
          createdAt: data.createdAt,
        };
      });

      return invites;
    } catch (error: any) {
      return rejectWithValue(error.message || "Fetch invites failed");
    }
  }
);

// Прийняття інвайту
export const acceptInvite = createAsyncThunk<string, { token: string; userId: string }>(
  "access/acceptInvite",
  async ({ token, userId }, { rejectWithValue }) => {
    try {
      const invitesCol = collection(db, "invites");
      const q = query(invitesCol, where("token", "==", token));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return rejectWithValue("Invalid token");

      const inviteDoc = snapshot.docs[0];
      const inviteData = inviteDoc.data() as any;

      if (inviteData.status === "accepted") return rejectWithValue("Invite already accepted");

      const tripRef = doc(db, "trips", inviteData.tripId);
      await updateDoc(tripRef, {
        collaborators: [...(inviteData.collaborators || []), userId],
      });

      await updateDoc(inviteDoc.ref, { status: "accepted" });

      return userId;
    } catch (error: any) {
      return rejectWithValue(error.message || "Accept invite failed");
    }
  }
);
