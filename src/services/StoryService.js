import api from "./api";

export const getModules = async () => {
  return await api
    .get("modules")
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};
