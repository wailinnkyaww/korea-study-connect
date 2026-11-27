import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "../config/firebase";
import type { StudentProfile, AgencyProfile } from "../types/profile";

// STUDENT

export const getStudentProfile = async (
  uid: string,
): Promise<StudentProfile | null> => {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  if (data.role !== "student") {
    throw new Error("This account is not a student account.");
  }

  return {
    uid,
    fullName: data.fullName || "",
    email: data.email || "",
    role: "student",
    phone: data.phone || "",
    dateOfBirth: data.dateOfBirth || "",
    gender: data.gender || "",
    nationality: data.nationality || "",
    address: data.address || "",
    currentEducation: data.currentEducation || "",
    preferredDegree: data.preferredDegree || "",
    preferredMajor: data.preferredMajor || "",
    preferredCountry: data.preferredCountry || "",
    preferredLanguage: data.preferredLanguage || "",
    bio: data.bio || "",
    profileImage: data.profileImage || "",
  };
};

type StudentProfileUpdate = Omit<StudentProfile, "uid" | "email" | "role">;

export const updateStudentProfile = async (
  uid: string,
  profile: StudentProfileUpdate,
): Promise<void> => {
  await updateDoc(doc(db, "users", uid), {
    ...profile,
    updatedAt: serverTimestamp(),
  });
};

// AGENCY

export const getAgencyProfile = async (
  uid: string,
): Promise<AgencyProfile | null> => {
  const snapshot = await getDoc(doc(db, "agencies", uid));

  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  return {
    userId: uid,
    agencyName: data.agencyName || "",
    email: data.email || "",
    phone: data.phone || "",
    website: data.website || "",
    address: data.address || "",
    city: data.city || "",
    country: data.country || "",
    registrationNumber: data.registrationNumber || "",
    establishedYear: data.establishedYear || "",
    description: data.description || "",
    services: data.services || "",
    specialization: data.specialization || "",
    logo: data.logo || "",
  };
};

type AgencyProfileUpdate = Omit<AgencyProfile, "userId" | "logo">;

export const updateAgencyProfile = async (
  uid: string,
  profile: AgencyProfileUpdate,
): Promise<void> => {
  const batch = writeBatch(db);

  const agencyRef = doc(db, "agencies", uid);
  const userRef = doc(db, "users", uid);

  batch.set(
    agencyRef,
    {
      userId: uid,
      ...profile,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  batch.update(userRef, {
    fullName: profile.agencyName,
    updatedAt: serverTimestamp(),
  });

  await batch.commit();
};
