import { useEffect } from "react";

interface metadataType {
  title: string;
}
export const useTitle = (title = "Note Me") => {
  useEffect(() => {
    document.title = title + " | Note Me";
  }, []);
};
