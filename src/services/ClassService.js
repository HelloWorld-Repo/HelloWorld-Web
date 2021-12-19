import api from "./api";

export const getClasses = async () => {
  return await api.get("classes");
};

export const createClass = async (data) => {
  return await api.post("class", { ...data });
};
