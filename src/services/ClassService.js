import api from "./api";

export const getClasses = async () => {
  return await api
    .get("classes")
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};

export const createClass = async (data) => {
  return await api
    .post("class", { ...data })
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};
