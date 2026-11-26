import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../config/firebase";

export interface ApplicationAgency {
  id: string;
  name: string;
}

export interface StudentProfile {
  fullName: string;
  email: string;
}

export interface SubmitApplicationData {
  studentId: string;
  studentName: string;
  studentEmail: string;
  universityId: string;
  universityName: string;
  program: string;
  degree: string;
  intake: string;
  agencyId: string;
  notes: string;
}

// Get public agency listings.
// IMPORTANT: Each agency document ID must be its Firebase Auth UID.
export const getApplicationAgencies = async (): Promise<
  ApplicationAgency[]
> => {
  const snapshot = await getDocs(collection(db, "agencies"));

  return snapshot.docs.map((agencyDoc) => {
    const data = agencyDoc.data();

    return {
      id: agencyDoc.id,
      name: data.agencyName || data.name || data.fullName || "Education Agency",
    };
  });
};

// Get the student's own profile.
export const getStudentApplicationProfile = async (
  studentId: string,
): Promise<StudentProfile> => {
  const profileRef = doc(db, "users", studentId);
  const profileSnapshot = await getDoc(profileRef);

  if (!profileSnapshot.exists()) {
    throw new Error("Student profile was not found.");
  }

  const profile = profileSnapshot.data();

  if (profile.role !== "student") {
    throw new Error("Only student accounts can submit applications.");
  }

  return {
    fullName: profile.fullName || "",
    email: profile.email || "",
  };
};

// Submit a new application.
export const submitStudentApplication = async (
  application: SubmitApplicationData,
): Promise<string> => {
  const applicationRef = await addDoc(collection(db, "applications"), {
    studentId: application.studentId,
    studentName: application.studentName,
    studentEmail: application.studentEmail,
    universityId: application.universityId,
    universityName: application.universityName,
    program: application.program,
    degree: application.degree,
    intake: application.intake,
    agencyId: application.agencyId,
    status: "Pending",
    submittedAt: serverTimestamp(),
    notes: application.notes,
  });

  return applicationRef.id;
};
