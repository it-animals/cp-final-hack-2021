import styled from "styled-components";
import { _variables } from "../styles/_variables";
import { Paper } from "@mui/material";

const Wrapper = styled(Paper)`
  width: 100%;
  padding: 20px;
  background-color: white;
`;
export const InfoBlock: CT<unknown> = ({ children, className }) => {
  return (
    <Wrapper className={className} elevation={3}>
      {children}
    </Wrapper>
  );
};
