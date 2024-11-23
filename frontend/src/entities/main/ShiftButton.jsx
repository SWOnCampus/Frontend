import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ShiftButton() {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    navigate("/mypage");
  };
  const handleEditClick = () => {
    navigate("/info-edit");
  };

  return (
    <Container>
      <StyledButton onClick={handleEditClick}>내 정보 수정하기</StyledButton>
      <StyledButton onClick={handleMyPageClick}>
        지난 리포트 보러가기
      </StyledButton>
      <StyledButton>마음AI 더 알아보기</StyledButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 50rem;
  height: 3rem;
  border-radius: 20px;
  margin-top: 1rem;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  width: 15rem;
  height: 2.8rem;
  border: none;
  border-radius: 15px;
  background-color: #d9d9d9;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;