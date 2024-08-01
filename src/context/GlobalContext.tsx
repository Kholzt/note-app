import { useLocation } from "react-router-dom";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";

// Definisikan tipe untuk context
interface GlobalContextType {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  setShowNavbar: Dispatch<SetStateAction<boolean>>;
  showNavbar: boolean;
}

// Nilai default untuk context
const defaultGlobalContext: GlobalContextType = {
  reload: false,
  showNavbar: false,
  setShowNavbar: () => {},
  setReload: () => {},
};

// Membuat context
const GlobalContext = createContext<GlobalContextType>(defaultGlobalContext);

// Custom hook untuk menggunakan context ini
export const useGlobal = () => {
  return useContext(GlobalContext);
};

// Membuat provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [reload, setReload] = useState<boolean>(true);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    setShowNavbar(false);
  }, [location.pathname]);
  return (
    <GlobalContext.Provider
      value={{ reload, setReload, showNavbar, setShowNavbar }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
