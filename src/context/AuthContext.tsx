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
import { getSingleRequest, postRequest } from "../utils/services";
import { generateId } from "../utils/helpers";

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
        const email = user?.email;
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          phone: user.phoneNumber,
        };
        const id = generateId();
        const filter = {
          email: email,
        };
        getSingleRequest("/users", filter).then((data) => {
          if (!data) {
            postRequest(`/users/${id}`, userData);
          }
        });
        console.log("test");
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
