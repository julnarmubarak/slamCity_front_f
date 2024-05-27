import axios from "axios";
import { API_URL } from "./apiConfig";

export const Get = async (route) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await axios.get(`${API_URL}/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error && error.response && error.response.status == 428) {
      localStorage.removeItem("token");
      localStorage.removeItem("full_name");
      localStorage.removeItem("r_id");
    }

    console.error(error);
  }
};

export const Post = async (route, body) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axios.post(`${API_URL}/${route}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
    // Handle the response data here
  } catch (error) {
    if (error && error.response && error.response.status == 428) {
      localStorage.removeItem("token");
      localStorage.removeItem("full_name");
      localStorage.removeItem("r_id");
    }
    console.error(error);
    return error;
  }
};

export const PUT = async (route, body) => {
  try {
    const response = await axios.put(`${API_URL}/${route}`, body);
    return response.data;
    // Handle the response data here
  } catch (error) {
    console.error(error);
    return error;
  }
};
