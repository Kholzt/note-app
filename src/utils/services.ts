import { remove } from "firebase/database";
import { database, ref, set, get, child } from "./firebase";

const postRequest = async (url: string, data: object) => {
  try {
    await set(ref(database, url), data);
  } catch (e) {
    console.error("Error post request: ", e);
  }
};
const getRequest = async (url: string) => {
  try {
    const snapshot = await get(child(ref(database), url));
    if (snapshot.exists()) {
      const data = snapshot.val();
      if (data.hasOwnProperty("title")) {
        return data;
      }
      const dataArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      return dataArray;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (e) {
    console.error("Error getting data: ", e);
    return [];
  }
};

const deleteRequest = async (url: string) => {
  try {
    const noteRef = ref(database, url);
    await remove(noteRef);
    console.log("Note deleted successfully");
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};

export { getRequest, postRequest, deleteRequest };
