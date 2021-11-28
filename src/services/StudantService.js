import api from "./api";

export const getAllStudants = async () => {
  return await api
    .get("users")
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};
