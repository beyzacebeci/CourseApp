import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7146/api/",
  timeout: 6000,
});

// Token kontrolünü interceptor olarak ekleyelim
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleResponse = async (apiCall) => {
  try {
    const response = await apiCall();
    return {
      status: response.status,
      data: response.data,
      success: true,
    };
  } catch (error) {
    const errorData = {
      status: error.response?.status || 500,
      data: {
        errorMessage: error.response?.data?.errorMessage || [error.message],
      },
      success: false,
    };
    //  console.error("API Error:", errorData);
    return errorData;
  }
};

export const getAPI = (url) => handleResponse(() => api.get(url));
export const postAPI = (url, data, headers) =>
  handleResponse(() => api.post(url, data, { headers }));
export const putAPI = (url, data) => handleResponse(() => api.put(url, data));
export const deleteAPI = (url) => handleResponse(() => api.delete(url));
