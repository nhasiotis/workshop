import { Item } from "../modules/state/types";

export const get = async (endpoint: string): Promise<Item[]> => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });

    if (response.ok) {
      return response.json();
    }

    if (response.status === 401) {
      throw new Error("A unauthorized error occured");
    }
    throw new Error("An unexpected error occurred");
  } catch (e) {
    throw new Error(" A network error occurred");
  }
};
