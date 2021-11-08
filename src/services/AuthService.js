import api from "./api";

const login = async (email, password) => {
  return api
    .post("login", {
      email,
      password,
    })
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};

const AuthService = {
  login,
};

export default AuthService;
