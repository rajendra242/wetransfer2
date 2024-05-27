import styled from "styled-components";

export default function ReferencesContent({ content }) {
  return (
    <>
      <h2>References</h2>
      <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
    </>
  );
}

const Content = styled.div`
  ol {
    list-style: decimal;
    margin-left: 20px;

    li {
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
    }
  }
`;
