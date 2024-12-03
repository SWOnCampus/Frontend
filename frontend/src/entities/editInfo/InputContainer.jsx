import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InputContainer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태

  useEffect(() => {
    // 로컬 스토리지에서 사용자 데이터 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      const decodedEmail = atob(authToken);
      const currentUser = users.find((user) => user.email === decodedEmail);

      if (currentUser) {
        setEmail(currentUser.email);
        setName(currentUser.name);
        setPhone(currentUser.phone || "");
      }
    }
  }, []);

  // 입력값 검증 로직
  useEffect(() => {
    const isEmailValid = email.includes("@") && email.includes(".");
    const isNameValid = name.trim().length > 0;
    const isPhoneValid = /^\d{3}-\d{3,4}-\d{4}$/.test(phone);

    setIsFormValid(isEmailValid && isNameValid && isPhoneValid);
  }, [email, name, phone]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    if (!isFormValid) {
      alert("입력값이 올바르지 않습니다.");
      return;
    }

    // 로컬 스토리지에서 사용자 데이터 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      const decodedEmail = atob(authToken);
      const userIndex = users.findIndex((user) => user.email === decodedEmail);

      if (userIndex !== -1) {
        // 사용자 데이터 업데이트
        users[userIndex] = { ...users[userIndex], email, name, phone };
        localStorage.setItem("users", JSON.stringify(users));
        alert("수정이 완료되었습니다.");
        setEditMode(false); // 수정 모드 종료
        navigate("/mypage");
      } else {
        alert("사용자 데이터를 찾을 수 없습니다.");
      }
    }
  };

  return (
    <Wrapper>
      <InputWrapper>
        <InputTitle>이메일</InputTitle>
        <Input
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!editMode}
        />
      </InputWrapper>

      <InputWrapper>
        <InputTitle>이름</InputTitle>
        <Input
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!editMode}
        />
      </InputWrapper>

      <InputWrapper>
        <InputTitle>전화번호</InputTitle>
        <Input
          placeholder="전화번호를 입력하세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          readOnly={!editMode}
        />
      </InputWrapper>

      {editMode ? (
        <SaveButton onClick={handleSave} disabled={!isFormValid}>
          저장하기
        </SaveButton>
      ) : (
        <EditButton onClick={handleEditToggle}>수정하기</EditButton>
      )}
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

const InputWrapper = styled.div`
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
  display: flex;
  align-items: center;
  height: 3.35rem;
  border-radius: 0.3125rem;
  border: 1px solid #888;
  background: ${({ readOnly }) => (readOnly ? "#f9f9f9" : "#fff")};
  padding: 0 1rem;
  box-sizing: border-box;
  width: 100%;
  color: #000;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const EditButton = styled.button`
  height: 3.41rem;
  width: 100%;
  border-radius: 0.3125rem;
  background: #4262ff;
  color: #fff;
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 1.6rem;
  border: none;
`;

const SaveButton = styled(EditButton)`
  background: ${({ disabled }) => (disabled ? "#ccc" : "#4262ff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;
`;
