import styled from "styled-components";
import { useState } from "react";
import { emailCheck, businessNumberCheck, signup } from "../../api/registerApi";
import { useNavigate } from "react-router-dom";

export default function InputContent() {
  const navigate = useNavigate();
  // 상태관리
  const [email, setEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [company, setCompany] = useState("");
  const [path, setPath] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    businessNumber: "",
  });

  // 유효성 검사 함수
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => value.length >= 8;

  const validatePhone = (value) => {
    const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(value.trim());
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setErrors((prev) => ({
      ...prev,
      phone: validatePhone(value) ? "" : "올바른 휴대폰 번호 형식이 아닙니다.",
    }));
  };

  const validateBusinessNumber = (value) => {
    const businessNumberRegex = /^\d{3}-\d{2}-\d{5}$/;
    return businessNumberRegex.test(value.trim());
  };

  const handleBusinessNumberChange = (value) => {
    setBusinessNumber(value);
    setErrors((prev) => ({
      ...prev,
      businessNumber: validateBusinessNumber(value)
        ? ""
        : "올바른 사업자 등록번호 형식이 아닙니다.",
    }));
  };

  const handleBlur = (field, value) => {
    let error = "";
    const trimmedValue = value.trim();

    if (field === "email" && !validateEmail(trimmedValue)) {
      error = "유효한 이메일 주소를 입력해주세요.";
    } else if (field === "password" && !validatePassword(trimmedValue)) {
      error = "비밀번호 형식에 맞지 않습니다.";
    } else if (field === "confirmPassword" && trimmedValue !== password) {
      error = "비밀번호가 일치하지 않습니다.";
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  //버튼 활성화

  const isFormValid =
    validateEmail(email) &&
    validatePassword(password) &&
    confirmPassword === password &&
    name.trim() &&
    validatePhone(phone) &&
    validateBusinessNumber(businessNumber);

  const isEmailValid = validateEmail(email);
  const isBusinessNumberValid = validateBusinessNumber(businessNumber);

  //이메일 중복확인
  const handleEmailCheck = async () => {
    try {
      const response = await emailCheck(email);
      if (response.status === 200) {
        alert(response.message || "사용 가능한 이메일입니다.");
        setEmailChecked(true);
      } else {
        alert(response.message || "이메일 중복 확인에 실패했습니다.");
      }
    } catch (error) {
      alert(
        error.message ||
          "이메일 확인 중 오류가 발생했습니다. 다시 시도해주세요."
      );
      setEmailChecked(false);
    }
  };
  //사업자 등록번호 검색
  const handleBusinessNumberCheck = async () => {
    try {
      const response = await businessNumberCheck(businessNumber);

      if (response.status === 0) {
        alert("유효한 사업자 등록번호입니다!");
      } else {
        alert(response.message || "유효하지 않은 사업자 등록번호입니다.");
      }
    } catch (error) {
      alert(
        error.message ||
          "사업자 등록번호 확인 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  //회원가입 기능
  const handleRegister = async () => {
    if (!emailChecked) {
      alert("이메일 중복확인을 진행해주세요.");
      return;
    }

    const data = {
      email,
      password,
      name,
      phone,
      businessNum: businessNumber,
      signupRoute: path,
      corporation: company,
    };

    try {
      const result = await signup(data);
      alert("회원가입에 성공했습니다!");
      console.log("Signup success:", result);
      navigate("/login");
    } catch (error) {
      alert(
        error.message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <Wrapper>
      <InputContainer>
        <InputTitle>
          이메일 <span style={{ color: "#FF2F2F" }}>*</span>
        </InputTitle>
        <div style={{ display: "flex", gap: "0.69rem" }}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email", email)}
            placeholder="이메일을 입력해주세요."
            style={{ color: email ? "#000" : "#888" }}
          />
          <Button disabled={!isEmailValid} onClick={handleEmailCheck}>
            중복확인
          </Button>
        </div>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <InputTitle>
          비밀번호 <span style={{ color: "#FF2F2F" }}>*</span>
        </InputTitle>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password", password)}
          placeholder="특수문자, 영어, 숫자를 포함하여 8자리 이상 입력해주세요."
          style={{ color: password ? "#000" : "#888" }}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <InputTitle>
          비밀번호 확인 <span style={{ color: "#FF2F2F" }}>*</span>
        </InputTitle>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => handleBlur("confirmPassword", confirmPassword)}
          placeholder="비밀번호를 다시 입력해주세요."
          style={{ color: confirmPassword ? "#000" : "#888" }}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}
      </InputContainer>

      <InputContainer>
        <InputTitle>
          이름 <span style={{ color: "#FF2F2F" }}>*</span>
        </InputTitle>
        <Input
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <InputTitle>
          휴대폰 <span style={{ color: "#FF2F2F" }}>*</span>
        </InputTitle>
        <Input
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="010-1234-4678 형식으로 입력해주세요."
          style={{ color: phone ? "#000" : "#888" }}
        />
        {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
      </InputContainer>

      <InputContainer>
        <InputTitle>
          사업자 등록번호 <span style={{ color: "#FF2F2F" }}>*</span>
        </InputTitle>
        <div style={{ display: "flex", gap: "0.69rem" }}>
          <Input
            value={businessNumber}
            onChange={(e) => handleBusinessNumberChange(e.target.value)}
            placeholder="123-12-13131 형식으로 입력해주세요."
            style={{ color: businessNumber ? "#000" : "#888" }}
          />
          <Button
            disabled={!isBusinessNumberValid}
            onClick={handleBusinessNumberCheck}
          >
            검색
          </Button>
        </div>
        {errors.businessNumber && (
          <ErrorMessage>{errors.businessNumber}</ErrorMessage>
        )}
      </InputContainer>

      <InputContainer>
        <InputTitle>회사/소속</InputTitle>
        <Input
          placeholder="회사/소속을 입력해주세요."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <InputTitle>가입경로</InputTitle>
        <Input
          placeholder="가입경로를 입력해주세요."
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </InputContainer>

      <RegisterButton disabled={!isFormValid} onClick={handleRegister}>
        가입하기
      </RegisterButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const InputTitle = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  color: #888;
  font-family: Inter;
  font-size: 0.9375rem;
  font-weight: 500;
  height: 3.35rem;
  border-radius: 0.3125rem;
  border: 1px solid #888;
  background: #fff;
  padding: 0 1rem;
  box-sizing: border-box;
  width: 100%;
  &:focus {
    border-color: #4262ff;
  }
`;

const Button = styled.button`
  height: 3.35rem;
  width: 8rem;
  border-radius: 0.31rem;
  background: ${(props) => (props.disabled ? "#E7ECF0" : "#4262FF")};
  color: ${(props) => (props.disabled ? "#888" : "#FFF")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: none;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8.0625rem;
  cursor: pointer;
`;

const RegisterButton = styled.button`
  height: 3.41rem;
  width: 100%;
  border-radius: 0.3125rem;
  background: ${(props) => (props.disabled ? "#e7ecf0" : "#4262ff")};
  color: ${(props) => (props.disabled ? "#888" : "#fff")};
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 1.6rem;
  border: none;
`;

const ErrorMessage = styled.div`
  color: #ff2f2f;
  font-size: 0.75rem;
  margin-top: 0.4rem;
`;
