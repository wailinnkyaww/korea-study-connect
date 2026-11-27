import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../config/firebase";

export type UserRole = "student" | "agency" | "admin";

export interface AppUser {
  uid: string;
  email: string;
  fullName: string;
  role: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  currentUser: AppUser | null;
  loading: boolean;
  firebaseUser: User | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setFirebaseUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setFirebaseUser(user);

      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      try {
        // Get user document
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          console.error("User document does not exist:", user.uid);
          setCurrentUser(null);
          return;
        }

        const userData = userSnapshot.data();

        // Get profile image
        let profileImage = userData.profileImage || "";

        // Agency logo is stored in agencies collection
        if (userData.role === "agency") {
          const agencyRef = doc(db, "agencies", user.uid);
          const agencySnapshot = await getDoc(agencyRef);

          if (agencySnapshot.exists()) {
            profileImage = agencySnapshot.data().logo || "";
          }
        }

        // Set current user
        setCurrentUser({
          uid: user.uid,
          email: user.email || "",
          fullName: userData.fullName || "",
          role: userData.role as UserRole,
          profileImage,
        });
      } catch (error) {
        console.error("Error loading user profile:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, firebaseUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
