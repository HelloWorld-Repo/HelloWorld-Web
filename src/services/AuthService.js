import api from "./api";

export const login = async (email, password) => {
  return api.post("login", {
    email,
    password,
  });
};
