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

export const getChapters = async () => {
  return await api
    .get("chapters")
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};

export const getQuestions = async (chapterId) => {
  return await api
    .get(`questions?chapterId=${chapterId}`)
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      throw error?.response?.data;
    });
};
