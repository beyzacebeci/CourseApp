import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7146/api/",
  timeout: 6000,
});

//localStorageden tokeni al
const token = localStorage.getItem("token");
if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const handleResponse = async (apiCall) => {
  try {
    const response = await apiCall();
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response || error.message,
    };
  }
};

export const getAPI = (url) => handleResponse(() => api.get(url));
export const postAPI = (url, data, headers) =>
  handleResponse(() => api.post(url, data, { headers }));
export const putAPI = (url, data) => handleResponse(() => api.put(url, data));
export const deleteAPI = (url) => handleResponse(() => api.delete(url));
