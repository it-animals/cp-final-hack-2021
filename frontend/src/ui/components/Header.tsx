import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Avatar } from "./Avatar";
import styled from "styled-components";
import { Logo } from "./Logo";

const AppBarElement = styled(AppBar)``;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header: CT<unknown> = () => {
  return (
    <header>
      <Box>
        <AppBarElement variant={"elevation"} position="static">
          <Toolbar style={{ width: "100%" }}>
            <Content>
              <Logo color={"secondary"} />
              <Avatar name={"123"} isShowName={true} />
            </Content>
          </Toolbar>
        </AppBarElement>
      </Box>
    </header>
  );
};
