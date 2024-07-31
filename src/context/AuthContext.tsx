import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import Loading from "./../components/Loading";

// Definisikan tipe untuk context
interface AuthContextType {
  isLogin: boolean;
  user: object | null;
  setUser: Dispatch<SetStateAction<object | null>>;
}

// Nilai default untuk context
const defaultAuthContext: AuthContextType = {
  isLogin: false,
  user: null,
  setUser: () => {},
};

// Membuat context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Custom hook untuk menggunakan context ini
export const useAuth = () => {
  return useContext(AuthContext);
};

// Membuat provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <Loading />;
  }
  const value = {
    isLogin: !!user,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
