import axios from "axios";

// 기존 axiosInstance를 그대로 두되, 요청을 가로채서 처리
const axiosInstance = axios.create();

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답을 가로채서 처리
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
