import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // },
});

// Add a request interceptor
// AxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers["auth-token"] = token;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

export default AxiosInstance;
