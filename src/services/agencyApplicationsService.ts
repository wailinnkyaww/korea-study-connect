import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp,
} from "firebase/firestore";

import { db } from "../config/firebase";

export type ApplicationStatus =
  | "Pending"
  | "Under Review"
  | "Accepted"
  | "Rejected";

export interface AgencyApplication {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  universityId: string;
  universityName: string;
  program: string;
  degree: string;
  intake: string;
  status: ApplicationStatus;
  agencyId: string;
  submittedAt?: Timestamp | null;
  notes?: string;
}

export const getAgencyApplications = async (
  agencyId: string,
): Promise<AgencyApplication[]> => {
  const applicationsQuery = query(
    collection(db, "applications"),
    where("agencyId", "==", agencyId),
  );

  const snapshot = await getDocs(applicationsQuery);

  const applications = snapshot.docs.map((applicationDoc) => {
    const data = applicationDoc.data();

    return {
      id: applicationDoc.id,
      studentId: data.studentId || "",
      studentName: data.studentName || "Unknown Student",
      studentEmail: data.studentEmail || "",
      universityId: data.universityId || "",
      universityName: data.universityName || "Unknown University",
      program: data.program || "Not specified",
      degree: data.degree || "Not specified",
      intake: data.intake || "Not specified",
      status: data.status || "Pending",
      agencyId: data.agencyId || "",
      submittedAt: data.submittedAt || null,
      notes: data.notes || "",
    } as AgencyApplication;
  });

  // Sort newest applications first.
  return applications.sort((a, b) => {
    const dateA = a.submittedAt?.toMillis() || 0;
    const dateB = b.submittedAt?.toMillis() || 0;

    return dateB - dateA;
  });
};

export const updateAgencyApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus,
): Promise<void> => {
  await updateDoc(doc(db, "applications", applicationId), {
    status,
    updatedAt: serverTimestamp(),
  });
};
