export const get = async (endpoint: string): Promise<string[]> => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });

    switch(response.status){
      case 200:
        return response.json()
      case 401:
        throw new Error("A unauthorized error occured");
      default: 
        throw new Error("An unexpected error occurred");
    }

  } catch (e) {
    throw new Error("A network error occured");
  }
};