import { equalTo, orderByChild, query, remove } from "firebase/database";
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

const getSingleRequest = async (
  url: string,
  filters: Record<string, any> = {}
) => {
  try {
    let dataQuery = ref(database, url);

    // Build the query with multi-field filtering
    Object.keys(filters).forEach((field) => {
      dataQuery = query(
        dataQuery,
        orderByChild(field),
        equalTo(filters[field])
      );
    });

    const snapshot = await get(dataQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error fetching data:", e);
    return null;
  }
};

const deleteRequest = async (url: string, id: string) => {
  try {
    const noteRef = ref(database, `${url}/${id}`);
    await remove(noteRef);
    console.log("Note deleted successfully");
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};

export { getRequest, postRequest, deleteRequest, getSingleRequest };
