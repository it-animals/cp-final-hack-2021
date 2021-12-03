import { AppBar, Box, Popover, Toolbar, Typography } from "@mui/material";
import { Avatar } from "./Avatar";
import styled from "styled-components";
import { Logo } from "./Logo";
import { useAppSelector } from "../../service/store/store";
import { selectUserData } from "../../service/store/userSlice";
import React, { useState } from "react";
import { appConfig } from "../../config";

const AppBarElement = styled(AppBar)``;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Exit = styled.div`
  height: 20px;
  cursor: pointer;
  width: 100%;
  padding: 20px 15px;
  display: flex;
  align-items: center;
`;

const MyAvatar = styled(Avatar)`
  cursor: pointer;
`;

export const Header: CT<unknown> = () => {
  const userData = useAppSelector(selectUserData);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <header>
      <Box>
        <AppBarElement variant={"elevation"} position="static">
          <Toolbar style={{ width: "100%" }}>
            <Content>
              <Box display={"flex"} alignItems={"center"} columnGap={"30px"}>
                <a href="/">
                  <Logo color={"secondary"} />
                </a>
                {appConfig.appName && (
                  <a href="/">
                    <Typography color={"white"} variant={"h5"}>
                      {appConfig.appName}
                    </Typography>
                  </a>
                )}
              </Box>
              <div id={"avatar"}>
                <MyAvatar
                  onClick={() => setOpen(true)}
                  name={userData?.user?.fio || userData?.user?.fio || ""}
                  isShowName={true}
                />
              </div>
            </Content>
          </Toolbar>
        </AppBarElement>
      </Box>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={document.getElementById("avatar")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <Exit
          onClick={() => {
            window.location.pathname = "/logout";
          }}
        >
          <Typography>Выход</Typography>
        </Exit>
      </Popover>
    </header>
  );
};
