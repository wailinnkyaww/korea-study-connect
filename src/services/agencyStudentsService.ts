import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../config/firebase";

export interface AgencyStudent {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export const getAgencyStudents = async (): Promise<AgencyStudent[]> => {
  try {
    const studentsQuery = query(
      collection(db, "users"),
      where("role", "==", "student"),
    );

    const snapshot = await getDocs(studentsQuery);

    return snapshot.docs.map((document) => {
      const data = document.data();

      return {
        id: document.id,
        fullName: data.fullName || "Unnamed Student",
        email: data.email || "No email",
        role: data.role || "student",
      };
    });
  } catch (error) {
    console.error("Error fetching agency students:", error);
    throw error;
  }
};
