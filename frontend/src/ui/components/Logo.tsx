import styled from "styled-components";
import logoPrimary from "../assets/icons/logo-primary.svg";
import logoSecondary from "../assets/icons/logo-secondary.svg";

const Element = styled.figure`
  width: 154px;
  height: 50px;
  margin: 0;
`;

export const Logo: CT<{ color: "primary" | "secondary" }> = ({
  className,
  color,
}) => {
  return (
    <Element className={className}>
      <img src={color === "primary" ? logoPrimary : logoSecondary} alt="logo" />
    </Element>
  );
};
