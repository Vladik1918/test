import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../api/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import type { IInvite } from "./types";
import { getDoc } from "firebase/firestore";

export const sendInvite = createAsyncThunk<
  IInvite,
  { tripId: string; email: string }
>("invite/send", async ({ tripId, email }, { rejectWithValue }) => {
  try {
    const invitesCol = collection(db, "invites");
    const q = query(
      invitesCol,
      where("tripId", "==", tripId),
      where("email", "==", email),
      where("accepted", "==", false)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) return rejectWithValue("Active invite already exists");

    const token = uuidv4();
    const now = new Date().toISOString();
    const inviteData: Omit<IInvite, "id"> = {
      tripId,
      email,
      token,
      createdAt: now,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    };

    const docRef = await addDoc(invitesCol, inviteData);

    return { id: docRef.id, ...inviteData };
  } catch (error: any) {
    return rejectWithValue(error.message || "Send invite failed");
  }
});

export const acceptInvite = createAsyncThunk<
  string,
  { token: string; userId: string }
>("invite/accept", async ({ token, userId }, { rejectWithValue }) => {
  try {
    const invitesCol = collection(db, "invites");
    const q = query(invitesCol, where("token", "==", token));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return rejectWithValue("Invalid token");

    const inviteDoc = snapshot.docs[0];
    const inviteData = inviteDoc.data() as any;

    if (inviteData.accepted) return rejectWithValue("Invite already accepted");

    const tripRef = doc(db, "trips", inviteData.tripId);
    const tripSnap = await getDoc(tripRef);
    if (!tripSnap.exists()) return rejectWithValue("Trip not found");

    const tripData = tripSnap.data();
    const currentCollaborators = tripData?.collaborators || [];

    await updateDoc(tripRef, {
      collaborators: [...currentCollaborators, userId],
    });

    await updateDoc(inviteDoc.ref, { accepted: true });

    return userId;
  } catch (error: any) {
    return rejectWithValue(error.message || "Accept invite failed");
  }
});

export const fetchInvites = createAsyncThunk<IInvite[], { tripId: string }>(
  "invite/fetch",
  async ({ tripId }, { rejectWithValue }) => {
    try {
      const invitesCol = collection(db, "invites");
      const q = query(invitesCol, where("tripId", "==", tripId));
      const snapshot = await getDocs(q);

      const invites: IInvite[] = [];
      snapshot.forEach((doc) => {
        invites.push({ id: doc.id, ...(doc.data() as Omit<IInvite, "id">) });
      });

      return invites;
    } catch (error: any) {
      return rejectWithValue(error.message || "Fetch invites failed");
    }
  }
);
