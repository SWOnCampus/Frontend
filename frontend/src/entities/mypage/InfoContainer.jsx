import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InfoContainer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 현재 사용자 정보 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const authToken = localStorage.getItem("authToken");

    // 현재 로그인한 사용자 확인
    if (authToken) {
      const decodedEmail = atob(authToken);
      const currentUser = users.find((user) => user.email === decodedEmail);

      if (currentUser) {
        setEmail(currentUser.email);
        setName(currentUser.name);
        setPhone(currentUser.phone);
        setBusinessNumber(currentUser.businessNumger || "정보 없음");
        setReport(currentUser.reports || []); // 사용자 리포트 추가 (옵션)
      }
    }
  }, []);

  return (
    <Wrapper>
      <InputContainer>
        <InputTitle>이메일</InputTitle>
        <Input>{email}</Input>
      </InputContainer>

      <InputContainer>
        <InputTitle>이름</InputTitle>
        <Input>{name}</Input>
      </InputContainer>

      <InputContainer>
        <InputTitle>전화번호</InputTitle>
        <Input>{phone}</Input>
      </InputContainer>

      <InputContainer>
        <InputTitle>사업자 등록번호</InputTitle>
        <Input>{businessNumber}</Input>
      </InputContainer>

      <InputContainer>
        <InputTitle>지난 리포트</InputTitle>
        {report.length === 0 ? (
          <ReportContainer>아직 리포트가 없어요!</ReportContainer>
        ) : (
          report.map((item, index) => (
            <PrevReport key={index}>
              <div>{item.date}</div>
              <div>{item.title}</div>
              <Button>다시보기</Button>
            </PrevReport>
          ))
        )}
      </InputContainer>

      <RegisterButton onClick={() => navigate("/info-edit")}>
        수정하기
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

const Input = styled.div`
  display: flex;
  align-items: center;
  height: 3.35rem;
  border-radius: 0.3125rem;
  border: 1px solid #888;
  background: #fff;
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

const ReportContainer = styled.div`
  width: 100%;
  height: 23.25rem;
  flex-shrink: 0;
  border-radius: 0.31rem;
  border: 1px solid #888;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c3c3c3;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const RegisterButton = styled.button`
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

const PrevReport = styled.div`
  border-radius: 0.3125rem;
  border: 1px solid #888;
  height: 3.34781rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const Button = styled.div`
  cursor: pointer;
  border-radius: 0.4rem;
  background: #4262ff;
  color: #fff;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0.3rem 0.8rem;
`;
