import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

import { db } from "../config/firebase";

export interface StudentApplication {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  universityId: string;
  universityName: string;
  program: string;
  degree: string;
  intake: string;
  agencyId: string;
  status: string;
  submittedAt?: Timestamp | null;
  notes?: string;
}

export const getStudentApplications = async (
  studentId: string,
): Promise<StudentApplication[]> => {
  const applicationsQuery = query(
    collection(db, "applications"),
    where("studentId", "==", studentId),
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
      agencyId: data.agencyId || "",
      status: data.status || "Pending",
      submittedAt: data.submittedAt || null,
      notes: data.notes || "",
    } as StudentApplication;
  });

  return applications.sort((a, b) => {
    const dateA = a.submittedAt?.toMillis() || 0;
    const dateB = b.submittedAt?.toMillis() || 0;

    return dateB - dateA;
  });
};
