import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loader: CT<{ height?: number }> = ({ height = 60 }) => {
  return (
    <Wrapper style={{ height: height }}>
      <CircularProgress disableShrink />
    </Wrapper>
  );
};
