import api from "./api";

export const getModules = async () => {
  return await api.get("modules");
};

export const getChapters = async () => {
  return await api.get("chapters");
};

export const getQuestions = async (chapterId) => {
  return await api.get(
    `questions${!!chapterId ? `?chapterId=${chapterId}` : ""}`
  );
};

export const createChapter = async (chapter) => {
  return await api.post("chapter", chapter);
};

export const getChapter = async (id) => {
  return await api.get(`chapter?id=${id}`);
};
export const getModule = async (id) => {
  return await api.get(`module?id=${id}`);
};

export const updateChapter = async (chapter) => {
  return await api.patch(`chapter`, chapter);
};

export const createQuestion = async (question) => {
  await api.post(`question`, question);
};
