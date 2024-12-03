import styled from "styled-components";
import logo from "../../assets/register/logo.svg";
import profile from "../../assets/mypage/profile.svg";
import logout from "../../assets/main/out.svg";
import msg from "../../assets/main/msg.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReportList() {
  const navigate = useNavigate();
  const [name, setName] = useState("마음ai");
  const [report, setReport] = useState([
    "리포트1",
    "리포트2",
    "리포트3",
    "리포트4",
    "리포트5",
    "리포트6",
    "리포트7",
    "리포트8",
    "리포트9",
    "리포트10",
    "리포트11",
    "리포트12",
    "리포트13",
    "리포트14",
    "리포트15",
    "리포트16",
    "리포트17",
    "리포트18",
    "리포트19",
  ]);
  //const [report, setReport] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 현재 사용자 정보 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const authToken = localStorage.getItem("authToken");

    // 현재 로그인한 사용자 확인
    if (authToken) {
      const decodedEmail = atob(authToken); // 토큰에서 이메일 복호화
      const currentUser = users.find((user) => user.email === decodedEmail);

      if (currentUser) {
        setName(currentUser.name || "사용자"); // 이름 설정
      }
    }
  }, []);

  return (
    <Wrapper>
      <Logo src={logo} />
      <Title>지난 리포트 보기</Title>

      <ListWrapper>
        {report.length === 0 ? (
          <None>리포트가 아직 없어요!</None>
        ) : (
          report.map((item, index) => (
            <List key={index}>
              <img src={msg} style={{ width: "1.5rem", height: "1.5rem" }} />
              <Prev>{item}</Prev>
            </List>
          ))
        )}
      </ListWrapper>

      <ProfileWrapper>
        <img
          src={profile}
          style={{
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("/login")}
        />
        <Name onClick={() => navigate("/mypage")}>{name}</Name>
        <img
          src={logout}
          style={{
            width: "1.2rem",
            height: "1.2rem",
            position: "absolute",
            right: "0",
            cursor: "pointer",
          }}
        />
      </ProfileWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  box-sizing: border-box;
  border-radius: 1.875rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Logo = styled.img`
  width: 13.3125rem;
  height: 2.75rem;
`;

const Title = styled.div`
  border-top: 1px solid #c9c9c9;
  border-bottom: 1px solid #c9c9c9;
  width: 100%;
  padding: 0.8rem 0;
  margin: 1rem 0;
`;

const ListWrapper = styled.div`
  min-height: 60%;
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
`;
const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 1rem;
`;

const Name = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: "pointer";
`;

const None = styled.div`
  color: #c9c9c9;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const List = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Prev = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
