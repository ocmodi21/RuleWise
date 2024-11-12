export default function useFetch() {
  const httpGet = async (endpoint: string): Promise<any> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      return { isError: true, data: "Something went wrong!!" };
    }
  };

  const httpPost = async (endpoint: string, data: any): Promise<any> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      return { isError: true, data: "Something went wrong!!" };
    }
  };

  return { httpGet, httpPost };
}
