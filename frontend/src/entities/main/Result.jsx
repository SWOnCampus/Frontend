import { useState } from "react";
import styled from "styled-components";
import { hoverGrow } from "../../shared/animation/hoverGrow";
import { getPdf, getAllPdf } from "../../api/consultApi";

export default function Result({ selectedButton, reportData }) {
  const title = ["요약", "상세"];
  const [name, setName] = useState("기업명");

  const parseContent = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const boldLine = line
        .split("**")
        .map((part, idx) =>
          idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
        );
      return <p key={index}>{boldLine.reduce((prev, curr) => [prev, curr])}</p>;
    });
  };

  const downloadPdf = async () => {
    try {
      console.log("PDF 다운로드 시작");

      const base64Pdf =
        selectedButton === 0 ? await getPdf() : await getAllPdf();

      const binary = atob(base64Pdf.data.pdf);
      const arrayBuffer = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        arrayBuffer[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${title[selectedButton]}_리포트.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("PDF 다운로드 완료");
    } catch (error) {
      console.error("PDF 다운로드 중 오류 발생:", error);
    }
  };
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          boxSizing: "border-box",
          padding: "1rem",
          justifyContent: "space-between",
          borderBottom: "1px solid #C9C9C9",
          alignItems: "center",
        }}
      >
        <Title>
          {name} {title[selectedButton]} 컨설팅 리포트
        </Title>
        <Button onClick={downloadPdf}>pdf 다운</Button>
      </div>

      <Content>
        {reportData
          ? parseContent(reportData)
          : "데이터를 불러오는 데 실패했습니다."}
      </Content>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
`;

const Title = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem;
`;

const Button = styled.div`
  width: 13.1875rem;
  height: 2.25rem;
  background: #333;
  border-radius: 0.625rem;
  color: #fff;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${hoverGrow}
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 2rem 3rem;
  height: 100%;
  overflow-y: scroll;
`;
