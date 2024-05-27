import axios from "axios";
import { API_URL } from "./apiConfig";

export const Get = async (route) => {
  try {
    const response = await axios.get(`${API_URL}/${route}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Post = async (route, body) => {
  try {
    const response = await axios.post(`${API_URL}/${route}`, body);
    return response.data;
    // Handle the response data here
  } catch (error) {
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

