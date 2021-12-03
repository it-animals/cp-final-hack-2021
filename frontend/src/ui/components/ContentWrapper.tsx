import styled from "styled-components";

const Wrapper = styled.div`
  padding: 40px;
`;
export const ContentWrapper: CT<unknown> = ({ children, className }) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};
