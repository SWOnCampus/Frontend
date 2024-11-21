import styled from "styled-components";
import logo from "../../assets/register/logo.svg";
import profile from "../../assets/mypage/profile.svg";
import InfoContainer from "./InfoContainer";

export default function MyPageComponent() {
  return (
    <Wrapper>
      <Logo src={logo} />
      <Title>내 프로필</Title>
      <img src={profile} style={{ width: "61px", height: "61px" }} />
      <Label>기업회원</Label>
      <InfoContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  width: 43.75rem;
  height: fit-content;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  padding: 2.38rem 3.31rem 5.78rem 3.31rem;
  margin: 9rem 0;
`;

const Logo = styled.img`
  width: 15.5625rem;
  height: 3.1875rem;
`;

const Font = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Title = styled(Font)`
  margin-top: 2.5rem;
`;
const SubTitle = styled(Font)`
  margin-top: 0.87rem;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  text-align: center;
`;

const Label = styled(Font)`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 400;
  width: 100%;
  height: 3.34781rem;
  border-radius: 0.3125rem;
  background: #4262ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
`;
