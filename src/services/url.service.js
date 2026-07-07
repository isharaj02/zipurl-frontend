import api from "@/api/axios";

export const createShortUrl = async (data) => {
  const response = await api.post("/urls", data);
  return response.data;
};

export const getMyUrls = async (params = {}) => {
  const response = await api.get("/urls/my", {
    params,
  });

  return response.data;
};

export const deleteUrl = async (id) => {
  const response = await api.delete(`/urls/${id}`);
  return response.data;
};

export const restoreUrl = async (id) => {
  const response = await api.patch(`/urls/${id}/restore`);
  return response.data;
};

export const getUrlAnalytics = async (id) => {
  const response = await api.get(`/urls/${id}/analytics`);
  return response.data;
};

export const getDashboardOverview = async () => {
  const response = await api.get("/urls/dashboard");
  return response.data;
};