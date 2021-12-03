import styled from "styled-components";
import { _variables } from "../styles/_variables";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const BoxElem = styled(Paper)`
  border-radius: 5px;
`;

const ContentBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const FilterBox: CT<{ title: string }> = ({
  title,
  className,
  children,
}) => {
  const theme = useTheme();
  const TitleBox = styled.div`
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: white;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    background: ${theme.palette.primary.light};
  `;
  return (
    <BoxElem>
      <TitleBox>
        <Typography fontSize={17} variant={"h6"}>
          {title}
        </Typography>
      </TitleBox>
      <ContentBox>{children}</ContentBox>
    </BoxElem>
  );
};
