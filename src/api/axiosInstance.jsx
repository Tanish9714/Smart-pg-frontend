import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v2/graphql",
  timeout: 10000,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    pg_id: "32059a0a-dca5-4b62-b208-3a9b70d8e1fb",
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const cookies = document.cookie.split("; ");
//     // const cookieMap = {};
//     // cookies.forEach((cookie) => {
//     //   const [key, value] = cookie.split("=");
//     //   cookieMap[key] = value;
//     // });

//     // if (cookieMap.authToken) {
//     //   config.headers["Authorization"] = `Bearer ${cookieMap.authToken}`;
//     // }

//     // config.headers["pg_id"] = "ea813d9e-fef8-4a2d-855c-e9bac8501b19";

//     // if (cookieMap.pg_id) {
//     //   config.headers["pg_id"] = cookieMap.pg_id;
//     // }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
