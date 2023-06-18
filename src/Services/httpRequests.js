import axios from "axios";
import { config } from "../config";

const gettingStarted = async (data) => {
  const url = config.BASE_URL + "/";
  return await axios.post(url, data, config.configs);
};
const login = async (data) => {
  const url = config.BASE_URL + "/login";
  return await axios.post(url, data, config.configs);
};
// const dashboard = async () => {
//   const url = config.BASE_URL + "/dashboard";
//   return await axios.get(url, config.configs);
// };
const uploadImage = async (data) => {
  const url = config.BASE_URL + "/upload-image";
  return await axios.post(url, data, config.configs);
};
const FetchImage = async (data) => {
  const url = config.BASE_URL + "/fetch";
  return await axios.post(url, data, config.configs);
};
const logout = async () => {
  const url = config.BASE_URL + "/logout";
  return await axios.delete(url, config.configs);
};

export { gettingStarted, login, uploadImage, logout, FetchImage };
