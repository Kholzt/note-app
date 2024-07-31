import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

// Definisikan tipe untuk context
interface GlobalContextType {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

// Nilai default untuk context
const defaultGlobalContext: GlobalContextType = {
  reload: false,
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

  return (
    <GlobalContext.Provider value={{ reload, setReload }}>
      {children}
    </GlobalContext.Provider>
  );
};
