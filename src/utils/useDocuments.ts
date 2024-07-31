import { useEffect } from "react";

export const useTitle = (title = "Note Me") => {
  useEffect(() => {
    document.title = title + " | Note Me";
  }, []);
};
