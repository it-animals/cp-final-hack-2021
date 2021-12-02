import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Avatar } from "./Avatar";
export const Header: CT<unknown> = () => {
  return (
    <header>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Заголовок
            </Typography>
            <Avatar name={"123"} isShowName={true} />
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};
