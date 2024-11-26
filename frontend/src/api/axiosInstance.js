import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://52.78.218.160:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰 가져오기
    console.log("토큰 확인:", token); // 여기서 토큰을 다시 확인
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 인증 헤더에 토큰 추가
      console.log(
        "Authorization 헤더 설정 완료:",
        config.headers.Authorization
      );
    } else {
      console.warn("토큰이 없습니다. Authorization 헤더를 추가하지 않습니다.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
