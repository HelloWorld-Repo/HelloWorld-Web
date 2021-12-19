import api from "./api";

export const getAllStudants = async () => {
  return await api.get("users");
};
