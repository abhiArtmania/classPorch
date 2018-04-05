import axios from "axios";
import { apiEndpoints } from 'ApiEndpoints';

export const request = (opts = {}) => {
  const store = localStorage.getItem("store");
  const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
  const defaultOptions = {
    headers: {
      ...opts,
      'Content-Type': 'application/json',
      'auth-token': token
    },
  };
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */

  const axiosApi = axios.create({
    baseURL: apiEndpoints.base,
    ...defaultOptions,
  });

  return axiosApi;
};

export default request;
