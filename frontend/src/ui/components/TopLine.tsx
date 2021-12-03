import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  min-height: 36px;
`;

export const TopLine: CT<unknown> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
