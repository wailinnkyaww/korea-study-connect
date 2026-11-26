import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

export interface AgencyDashboardStats {
  totalStudents: number;
  totalAgencies: number;
  totalAdmins: number;
}

const usersCollection = collection(db, "users");

export const getAgencyDashboardStats =
  async (): Promise<AgencyDashboardStats> => {
    try {
      const studentQuery = query(
        usersCollection,
        where("role", "==", "student"),
      );

      const agencyQuery = query(usersCollection, where("role", "==", "agency"));

      const adminQuery = query(usersCollection, where("role", "==", "admin"));

      const [studentSnapshot, agencySnapshot, adminSnapshot] =
        await Promise.all([
          getCountFromServer(studentQuery),
          getCountFromServer(agencyQuery),
          getCountFromServer(adminQuery),
        ]);

      return {
        totalStudents: studentSnapshot.data().count,
        totalAgencies: agencySnapshot.data().count,
        totalAdmins: adminSnapshot.data().count,
      };
    } catch (error) {
      console.error("Error fetching agency dashboard statistics:", error);
      throw error;
    }
  };
