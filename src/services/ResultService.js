import api from "./api";

export const getResultData = async () => {
  return await api.get("result");
};

export const getFeedbackData = async () => {
  return await api.get("feedbacks");
};
