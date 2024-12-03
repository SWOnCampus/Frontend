import styled from "styled-components";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import logo from "../../assets/register/logo.svg";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/registerApi";
export default function LoginComponent() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginClick = async () => {
    // 이메일 유효성 검사
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // 에러 상태 계산
    const newErrors = {
      email: !values.email || !emailPattern.test(values.email),
      password: !values.password,
    };

    setErrors(newErrors);

    // 에러가 없을 경우 로그인 성공 로직
    if (!Object.values(newErrors).some((error) => error)) {
      try {
        const response = await login(values.email, values.password);
        if (response.status === 200) {
          alert("로그인 성공");
          navigate("/");
        }
      } catch (error) {
        alert("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Logo src={logo} alt="logo" onClick={handleLogoClick} />
      <Form>
        <Input
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          placeholder="이메일"
          hasError={errors.email}
        />
        <PasswordWrapper>
          <Input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="비밀번호"
            hasError={errors.password}
          />
          <ToggleVisibility
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
          </ToggleVisibility>
        </PasswordWrapper>
        {(errors.email || errors.password) && (
          <ErrorMessage>아이디 또는 비밀번호를 확인해주세요</ErrorMessage>
        )}
        <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
      </Form>
      <Link href="#">비밀번호 찾기</Link>
      <SignUpButton onClick={handleSignUpClick}>회원가입</SignUpButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Logo = styled.img`
  width: 250px;
  margin-bottom: 40px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  gap: 15px;
  margin-top: 20px;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-right: 40px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ccc")};
  border-radius: 50px;
  outline: none;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? "red" : "#000")};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const ToggleVisibility = styled.button`
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  top: 30%;
  left: 550px;

  &:hover {
    color: #000;
  }
`;

const LoginButton = styled.button`
  padding: 20px;
  width: 600px;
  font-size: 16px;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const Link = styled.a`
  margin-top: 50px;
  font-size: 14px;
  color: #666;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpButton = styled.button`
  width: 600px;
  padding: 20px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-top: 40px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
