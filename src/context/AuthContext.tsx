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
import { useGlobal } from "./GlobalContext";

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
  const { socket } = useGlobal();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user?.email;
        let id = generateId();
        const userData = {
          id: "",
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          phone: user.phoneNumber,
        };
        const filter = {
          email: email,
        };
        const existingUser = await getSingleRequest("/users", filter);
        if (existingUser) {
          for (const key in existingUser) {
            id = existingUser[key].id;
          }
        }
        userData.id = id;
        await postRequest(`/users/${id}`, userData);
        setUser(userData);
        if (socket) socket.emit("privateRoom", userData.id);

        localStorage.setItem("user", JSON.stringify(userData));
      } else {
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [socket]);
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
