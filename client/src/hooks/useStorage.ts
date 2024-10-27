export default function useStorage() {
  const setDataToStorage = (key: string, data: string) => {
    localStorage.setItem(key, data);
  };

  const getDataFromStorage = (key: string) => {
    return localStorage.getItem(key);
  };

  return {
    setDataToStorage,
    getDataFromStorage,
  };
}
