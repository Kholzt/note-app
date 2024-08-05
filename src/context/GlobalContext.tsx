import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import io, { Socket } from "socket.io-client";
// Definisikan tipe untuk context
interface GlobalContextType {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  setShowNavbar: Dispatch<SetStateAction<boolean>>;
  showNavbar: boolean;
  socket: Socket | null;
}

// Nilai default untuk context
const defaultGlobalContext: GlobalContextType = {
  reload: false,
  showNavbar: false,
  setShowNavbar: () => {},
  setReload: () => {},
  socket: null,
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
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socketIo = io("http://localhost:4000");
    socketIo.connect();
    setSocket(socketIo);
    // Cleanup function to disconnect the socket
    return () => {
      if (socketIo) {
        socketIo.disconnect();
      }
    };
  }, []);
  return (
    <GlobalContext.Provider
      value={{ reload, setReload, showNavbar, setShowNavbar, socket }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
