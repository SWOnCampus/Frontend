import axiosInstance from "./axiosInstance";

//이메일 중복확인
// emailCheck 함수 수정
export const emailCheck = async (email) => {
  try {
    // 로컬 스토리지에서 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 이메일 중복 확인
    const isEmailTaken = users.some((user) => user.email === email);

    if (isEmailTaken) {
      throw new Error("이미 사용 중인 이메일입니다.");
    } else {
      return { status: 200, message: "사용 가능한 이메일입니다." };
    }
  } catch (error) {
    throw error;
  }
};

//사업자 등록번호 검색
export const businessNumberCheck = async (businessNumber) => {
  // 사업자 등록번호 형식 검증 (단순히 형식만 확인)
  const businessNumberRegex = /^\d{3}-\d{2}-\d{5}$/;
  const isValid = businessNumberRegex.test(businessNumber);

  if (isValid) {
    return { status: 0, message: "유효한 사업자 등록번호입니다." };
  } else {
    throw new Error("유효하지 않은 사업자 등록번호입니다.");
  }
};

//회원가입
export const signup = async (data) => {
  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 이메일 중복 확인
    const isEmailTaken = users.some((user) => user.email === data.email);
    if (isEmailTaken) {
      throw new Error("이미 사용 중인 이메일입니다.");
    }

    // 새로운 사용자 추가
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    return { status: 200, message: "회원가입에 성공했습니다." };
  } catch (error) {
    throw error;
  }
};

//로그인
export const login = async (email, password) => {
  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 사용자 인증
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // 토큰 생성 (여기서는 단순히 이메일을 토큰으로 사용)
      const token = btoa(email);

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("authToken", token);

      return { status: 200, data: { token } };
    } else {
      throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  } catch (error) {
    throw error;
  }
};
