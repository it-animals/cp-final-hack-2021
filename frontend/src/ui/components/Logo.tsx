import styled from "styled-components";

const Element = styled.figure`
  width: 173px;
  height: 24px;
  margin: 0;
`;

export const Logo: CT<unknown> = ({ className }) => {
  return (
    <Element className={className}>
      <img src={""} alt="logo" />
    </Element>
  );
};
