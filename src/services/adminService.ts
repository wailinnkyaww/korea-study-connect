import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";

export async function adminLogin(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists() || userSnap.data().role !== "admin") {
      await signOut(auth);
      throw new Error("Access denied. Admin account required.");
    }

    return user;
  } catch (error) {
    if (auth.currentUser?.uid === user.uid) {
      await signOut(auth);
    }
    throw error;
  }
}

export async function adminLogout() {
  await signOut(auth);
}

export async function checkAdmin(uid: string): Promise<boolean> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  return userSnap.exists() && userSnap.data().role === "admin";
}
