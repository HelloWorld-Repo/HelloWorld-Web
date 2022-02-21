import api from "./api";

export const getAllStudants = async () => {
  return await api.get("users");
};

export const registerUser = async (user) => {
  return await api.post("admin", user);
};

export const importUsers = async (formData) => {
  return await api.post("users/import", formData);
}