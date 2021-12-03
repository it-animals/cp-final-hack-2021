import React, { useRef } from "react";
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
import { ContentWrapper } from "./ContentWrapper";
import { Link as LinkSPA } from "react-router-dom";
import { Link } from "@mui/material";
import { _variables } from "../styles/_variables";
import { GorSeparator } from "./GorSeparator";

const Element = styled(Paper)`
  min-height: 80px;
  width: 100%;
  padding: 10px 20px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
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

export const Startap: CT<unknown> = ({ className, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    console.log("close");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const theme = useTheme();
  return (
    <Element
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      elevation={2}
    >
      {/*<LinkSPA to={"/startaps/123"}>*/}
      {/*<Link>*/}
      <Typography variant={"h6"}>
        Загрузочные вагоны для безопасности хомяков
      </Typography>
      <ChipContainer>
        <Chip label="Хомяки" size="small" defaultValue={"тег1"} />
        <Chip label="Вагоны" size="small" defaultValue={"тег1"} />
        <Chip label="Рельсы" size="small" defaultValue={"тег1"} />
        <Chip label="Поезда" size="small" defaultValue={"тег1"} />
        <Chip label="Стартап" size="small" defaultValue={"тег1"} />
      </ChipContainer>
      {/*</Link>*/}
      {/*</LinkSPA>*/}

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
            <PopoverHeading fontSize={16} fontWeight={"bold"} marginBottom={2}>
              Загрузочные вагоны для безопасности хомяков и котов и улиток и бла
              бла бла бла Загрузочные вагоны для безопасности хомяков и котов и
              улиток и бла бла бла бла
            </PopoverHeading>
            <PopoverDescription fontSize={14} color={_variables.textSecond}>
              Это очень большой проект посвященный бла бла бла бла Это очень
              большой проект посвященный бла бла бла бла Это очень большой
              проект посвященный бла бла бла бла Это очень большой проект
              посвященный бла бла бла бла Это очень большой проект посвященный
              бла бла бла бла Это очень большой проект посвященный бла бла бла
              бла Это очень большой проект посвященный бла бла бла бла Это очень
              большой проект посвященный бла бла бла блаЭто очень большой проект
              посвященный бла бла бла бла Это очень большой проект посвященный
              бла бла бла бла Это очень большой проект посвященный бла бла бла
              бла Это очень большой проект посвященный бла бла бла бла
            </PopoverDescription>
            <GorSeparator width={30} mrn={11} />
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  fontWeight={"bold"}
                  color={theme.palette.primary.main}
                  fontSize={14}
                >
                  Статус проекта:&nbsp;
                  <span
                    style={{
                      fontWeight: "normal",
                      color: _variables.textColor,
                    }}
                  >
                    Прототип
                  </span>
                </Typography>
                <Typography
                  fontWeight={"bold"}
                  color={theme.palette.primary.main}
                  fontSize={14}
                  mt={1}
                >
                  Направление:&nbsp;
                  <span
                    style={{
                      fontWeight: "normal",
                      color: _variables.textColor,
                    }}
                  >
                    Доступный и комфортный городской транспорт
                  </span>
                </Typography>
                <Typography
                  fontWeight={"bold"}
                  color={theme.palette.primary.main}
                  fontSize={14}
                  mt={1}
                >
                  Сертификация:&nbsp;
                  <span
                    style={{
                      fontWeight: "normal",
                      color: _variables.textColor,
                    }}
                  >
                    Нужна
                  </span>
                </Typography>
                <Typography
                  fontWeight={"bold"}
                  color={theme.palette.primary.main}
                  fontSize={14}
                  marginTop={1}
                >
                  Проект для:&nbsp;
                  <span
                    style={{
                      fontWeight: "normal",
                      color: _variables.textColor,
                    }}
                  >
                    Московского метрополитена
                  </span>
                </Typography>
                <Typography
                  fontWeight={"bold"}
                  color={theme.palette.primary.main}
                  fontSize={14}
                  mt={1}
                >
                  Ответственный:&nbsp;
                  <span
                    style={{
                      fontWeight: "normal",
                      color: _variables.textColor,
                    }}
                  >
                    Петров Петя
                  </span>
                </Typography>
              </Grid>
              <GorSeparator width={30} mrn={11} />
              <Grid item xs={12}>
                <Typography
                  fontWeight={"bold"}
                  color={theme.palette.primary.main}
                  fontSize={13}
                >
                  Теги:
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  flexWrap={"wrap"}
                  paddingTop={"3px"}
                  columnGap={"5px"}
                  rowGap={"5px"}
                >
                  <Chip label="Хомяки" size="small" defaultValue={"тег1"} />
                  <Chip label="Вагоны" size="small" defaultValue={"тег1"} />
                  <Chip label="Рельсы" size="small" defaultValue={"тег1"} />
                  <Chip label="Поезда" size="small" defaultValue={"тег1"} />
                  <Chip label="Стартап" size="small" defaultValue={"тег1"} />
                  <Chip label="ASd d" size="small" defaultValue={"тег1"} />
                  <Chip label="Бублики" size="small" defaultValue={"тег1"} />
                  <Chip label="Уши" size="small" defaultValue={"тег1"} />
                  <Chip label="Ноги" size="small" defaultValue={"тег1"} />
                  <Chip label="Клавиши" size="small" defaultValue={"тег1"} />
                </Box>
              </Grid>
            </Grid>
          </PopoverElement>
        </PopoverWrapper>
      </PopoverComponent>
    </Element>
  );
};
