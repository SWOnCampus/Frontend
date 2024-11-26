import axiosInstance from "./axiosInstance";

// 프로필 가져오기
export const getMyProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/get-my-profile");
    return response.data.data; // 응답의 data 필드 추출
  } catch (error) {
    console.error("프로필 가져오기 오류: ", error);
    throw error.response ? error.response.data : error;
  }
};
