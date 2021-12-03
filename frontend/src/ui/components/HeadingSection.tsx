import styled from "styled-components";
import { Typography, useTheme } from "@mui/material";

export const HeadingSection: CT<{ title: string }> = ({ title }) => {
  const theme = useTheme();
  const HeadingWrapper = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 3px solid ${theme.palette.primary.main};
  `;
  return (
    <HeadingWrapper>
      <Typography variant={"h4"} color={theme.palette.primary.main}>
        {title}
      </Typography>
    </HeadingWrapper>
  );
};
