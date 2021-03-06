import React from "react";
import styled from "styled-components";
import {
  Box,
  Chip,
  Grid,
  Paper,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as LinkSPA } from "react-router-dom";

import { _variables } from "../styles/_variables";
import { GorSeparator } from "./GorSeparator";
import {
  getCertProjectById,
  getForProjectById,
  getStatusProjectById,
  getTypeProjectById,
  ProjectType,
} from "../../domain/project";

const Element = styled(Paper)`
  min-height: 80px;
  width: 100%;
  padding: 10px 20px;
`;

const ChipContainer = styled.div`
  display: flex;
  column-gap: 10px;
  margin-top: 10px;
  width: 100%;
  overflow-x: hidden;
  justify-content: flex-end;
`;

const PopoverComponent = styled(Popover)`
  background-color: transparent;
  box-shadow: none;
`;

const PopoverWrapper = styled.div`
  padding: 0 15px;
  background-color: ${_variables.backgroundColor};
  position: relative;
  padding-bottom: 10px;
`;

const PopoverElement = styled(Paper)`
  width: 400px;
  min-height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const PopoverHeading = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const PopoverDescription = styled(Typography)`
  color: ${_variables.secondColor};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const OverFlowText = styled(Typography)`
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;

export const Startup: CT<ProjectType> = ({
  name,

  tags,
  className,
  children,
  descr,
  type,
  status,
  certification,
  for_transport,
  teams,
  id,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const theme = useTheme();
  return (
    <LinkSPA to={`/startup/${id}`}>
      <Element
        className={className}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        elevation={2}
      >
        <OverFlowText variant={"h6"}>{name}</OverFlowText>
        <ChipContainer>
          {tags.map((item) => (
            <Chip label={item.name} size="small" defaultValue={item.name} />
          ))}
        </ChipContainer>

        <PopoverComponent
          id="mouse-over-popover"
          container={document.getElementById("list")!}
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <PopoverWrapper>
            <PopoverElement elevation={3}>
              <PopoverHeading
                fontSize={16}
                fontWeight={"bold"}
                marginBottom={2}
              >
                {name}
              </PopoverHeading>
              <PopoverDescription fontSize={14} color={_variables.textSecond}>
                {descr.replace(/<[^>]*>?/gm, "")}
              </PopoverDescription>

              <GorSeparator width={30} mrn={11} />
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    color={theme.palette.primary.main}
                    fontSize={14}
                  >
                    ???????????? ??????????????:&nbsp;
                    <span
                      style={{
                        fontWeight: "normal",
                        color: _variables.textColor,
                      }}
                    >
                      {getStatusProjectById(status)}
                    </span>
                  </Typography>
                  <Typography
                    fontWeight={"bold"}
                    color={theme.palette.primary.main}
                    fontSize={14}
                    mt={1}
                  >
                    ??????????????????????:&nbsp;
                    <span
                      style={{
                        fontWeight: "normal",
                        color: _variables.textColor,
                      }}
                    >
                      {getTypeProjectById(type)}
                    </span>
                  </Typography>
                  <Typography
                    fontWeight={"bold"}
                    color={theme.palette.primary.main}
                    fontSize={14}
                    mt={1}
                  >
                    ????????????????????????:&nbsp;
                    <span
                      style={{
                        fontWeight: "normal",
                        color: _variables.textColor,
                      }}
                    >
                      {getCertProjectById(certification)}
                    </span>
                  </Typography>
                  <Typography
                    fontWeight={"bold"}
                    color={theme.palette.primary.main}
                    fontSize={14}
                    marginTop={1}
                  >
                    ???????????? ??????:&nbsp;
                    <span
                      style={{
                        fontWeight: "normal",
                        color: _variables.textColor,
                      }}
                    >
                      {getForProjectById(for_transport)}
                    </span>
                  </Typography>
                  {teams.length > 0 && (
                    <Typography
                      fontWeight={"bold"}
                      color={theme.palette.primary.main}
                      fontSize={14}
                      mt={1}
                    >
                      ??????????????????????????:&nbsp;
                      <span
                        style={{
                          fontWeight: "normal",
                          color: _variables.textColor,
                        }}
                      >
                        {teams.find((item) => item.is_owner)!.fio}
                      </span>
                    </Typography>
                  )}
                </Grid>
                <GorSeparator width={30} mrn={11} />
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    color={theme.palette.primary.main}
                    fontSize={13}
                  >
                    ????????:
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    flexWrap={"wrap"}
                    paddingTop={"3px"}
                    columnGap={"5px"}
                    rowGap={"5px"}
                  >
                    {tags.map((item) => (
                      <Chip
                        label={item.name}
                        size="small"
                        defaultValue={item.name}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </PopoverElement>
          </PopoverWrapper>
        </PopoverComponent>
      </Element>
    </LinkSPA>
  );
};
