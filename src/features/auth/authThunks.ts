// src/features/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../api/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { IUser } from "./types";

export const registerUser = createAsyncThunk<
  { user: IUser; idToken: string },
  { email: string; password: string; name?: string }
>("auth/register", async ({ email, password, name }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const userData: IUser = { uid, email, name, role: "User" };
    await setDoc(doc(db, "users", uid), userData);

    console.log("User written to Firestore successfully:", userData);

    const token = await getIdToken(userCredential.user);
    return { user: userData, idToken: token };
  } catch (error: any) {

    console.error("Register error:", error);
    return rejectWithValue(error.message || "Registration failed");
  }
});

export const loginUser = createAsyncThunk<
  { user: IUser; idToken: string },
  { email: string; password: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
      console.error("Login error: User document not found in Firestore");
      return rejectWithValue("User not found");
    }

    const userData = userDoc.data() as IUser;
    const token = await getIdToken(userCredential.user);
    return { user: userData, idToken: token };
  } catch (error: any) {
    console.error("Login error:", error);
    return rejectWithValue(error.message || "Login failed");
  }
});
