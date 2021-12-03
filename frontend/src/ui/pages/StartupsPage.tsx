import { Header } from "../components/Header";
import { PageTemplate } from "../components/PageTemplate";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Startup } from "../components/Startup";
import styled from "styled-components";
import { _variables } from "../styles/_variables";
import { hexToRgba } from "../styles/_mixin";
import { FilterBox } from "../components/FilterBox";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { ProjectStatus, ProjectType } from "../../domain/project";
import { NotFound } from "../components/NotFound";
import { projectService } from "../../service/project/project";
import { useSnackbar } from "notistack";
import useUrlState from "@ahooksjs/use-url-state";
import { motion } from "framer-motion";
import { rightToLeftAnimation } from "../lib/animations/rightToLeftAnimation";
import { upToDownFn } from "../lib/animations/upToDownAnimate";
import { tagsService } from "../../service/tag/tags";

const List = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
const SearchLine = styled.div`
  min-height: 60px;
  width: 100%;
  margin-bottom: 35px;
  display: flex;
  align-items: end;
  justify-content: space-between;
`;
const TabList = styled(Tabs)`
  border-bottom: 5px solid rgba(${hexToRgba(_variables.primaryColor, 0.8)});
  margin-bottom: 10px;
  height: 38px !important;
  min-height: 38px !important;
`;

const TabCustom = styled(Tab)`
  padding: 3px 16px !important;
  height: 36px !important;
  min-height: 36px !important;

  &.Mui-selected {
    background-color: ${_variables.primaryColor};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    color: white !important;
  }
`;

const StartupElem = motion(Startup);

export const StartupsPage = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [existSearch, setExitSearch] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [data, setData] = useState<ProjectType[]>([]);
  const [tagData, setTagData] = useState<ProjectType["tags"]>([]);
  const snackbar = useSnackbar();

  const [filterState, setFilterState] = useUrlState({
    status: "0",
    search: "",
    type: "0",
    sort: "-id",
    tags: "",
  });

  const load = async () => {
    setLoad(true);
    setData([]);
    try {
      const data = await projectService.list({
        status: Number(filterState.status!)! as ProjectStatus | 0,
        type: Number(filterState.type) as ProjectType["type"] | 0,
        tags: filterState.tags,
        search: filterState.search,
        sort: filterState.sort,
      });
      setData(data.data.projects);
    } catch (e) {
      snackbar.enqueueSnackbar("Ой, произошла ошибка. Попробуйте еще раз", {
        variant: "warning",
      });
    }
    setLoad(false);
  };

  const loadTags = async () => {
    try {
      const data = await tagsService.index();
      setTagData(data.data.tags);
    } catch (e) {
      snackbar.enqueueSnackbar("Ошибка загрузки тегов. Попробуйте еще раз", {
        variant: "warning",
      });
    }
  };

  const clearTagHandler = (id: number | string) => {
    const tags = filterState.tags.split(",");
    const filtered = tags.filter((item: string) => item !== String(id));
    setFilterState({ ...filterState, tags: filtered.join(",") });
  };
  const addTag = (id: string | number) => {
    const data = filterState.tags.length > 0 ? filterState.tags.split(",") : [];

    setFilterState({ ...filterState, tags: [...data, String(id)].join(",") });
  };

  useEffect(() => {
    load();
  }, [filterState]);

  useEffect(() => {
    loadTags();
    setInputSearch(filterState.search);
  }, []);

  const changeSearchHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputSearch(e.currentTarget.value);
  };

  const searchClickHandler = () => {
    if (!inputSearch.length) return;
    setFilterState({ ...filterState, search: inputSearch });
  };

  const clearSearchHandler = () => {
    setInputSearch("");
    setFilterState({ ...filterState, search: "" });
  };

  const ButtonWrapper = styled.div`
    width: 210px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  `;
  console.log(filterState.tags.includes(4));
  return (
    <>
      <PageTemplate>
        <Grid container xs={12}>
          <SearchLine>
            <Box sx={{ width: "70%", display: "flex", alignItems: "flex-end" }}>
              <SearchIcon sx={{ color: "second.main", mr: 1, my: 0.5 }} />
              <TextField
                onChange={changeSearchHandler}
                value={inputSearch}
                color={"primary"}
                fullWidth
                inputProps={{
                  style: { fontSize: 18 },
                }}
                id="input-with-sx"
                label="Поиск"
                variant="standard"
              />
            </Box>
            <ButtonWrapper>
              <Button variant={"contained"} onClick={searchClickHandler}>
                Поиск
              </Button>
              <Button
                onClick={clearSearchHandler}
                color={"secondary"}
                variant={"contained"}
              >
                Сбросить
              </Button>
            </ButtonWrapper>
          </SearchLine>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TabList
              value={Number(filterState.status)}
              onChange={(event, value) => {
                setFilterState({ ...filterState, status: String(value) });
              }}
              variant="scrollable"
              scrollButtons={"auto"}
              aria-label="scrollable auto tabs example"
            >
              <TabCustom label="Все" />
              <TabCustom label="Идея" />
              <TabCustom label="Прототип" />
              <TabCustom label="Продукт" />
              <TabCustom label="Закрыт" />
              <TabCustom label="Внедрение" />
            </TabList>
            <List id={"list"}>
              {isLoad && <Loader height={260} />}
              {!data.length && !isLoad && <NotFound />}
              {data &&
                !!data.length &&
                data.map((item) => <StartupElem key={item.id} {...item} />)}
            </List>
          </Grid>
          <Grid item xs={4} mt={4}>
            <Grid item xs={12}>
              <FilterBox title={"Сортировать по"}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    onChange={(e, value) =>
                      setFilterState({ ...filterState, sort: value })
                    }
                    value={filterState.sort}
                    defaultValue={filterState.sort}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="-id"
                      control={<Radio />}
                      label="Дате создания"
                    />
                    <FormControlLabel
                      value="name"
                      control={<Radio />}
                      label="Названию"
                    />
                  </RadioGroup>
                </FormControl>
              </FilterBox>
            </Grid>
            <Grid item xs={12} mt={1}>
              <FilterBox title={"Направление"}>
                <RadioGroup
                  aria-label="gender"
                  defaultValue={filterState.type}
                  name="radio-buttons-group"
                  onChange={(event, value) => {
                    setFilterState({ ...filterState, type: String(value) });
                  }}
                >
                  <FormControlLabel value="0" control={<Radio />} label="Все" />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Доступный и комфортный городской транспорт"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Новые виды мобильности"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Безопасность дорожного движения"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Здоровые улицы и экология"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="Цифровые технологии в транспорте"
                  />
                </RadioGroup>
              </FilterBox>
            </Grid>
            <Grid item xs={12} mt={1}>
              <FilterBox title={"Теги"}>
                {tagData.length > 0 && (
                  <FormGroup>
                    {tagData.map((item) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filterState.tags.includes(item.id)}
                            onChange={(event, checked) =>
                              checked
                                ? addTag(item.id)
                                : clearTagHandler(item.id)
                            }
                          />
                        }
                        label={item.name}
                      />
                    ))}
                  </FormGroup>
                )}
                {tagData.length === 0 && (
                  <Grid item xs={12}>
                    <Skeleton width={"50%"} height={"35px"} />
                    <Skeleton width={"50%"} height={"35px"} />
                    <Skeleton width={"50%"} height={"35px"} />
                    <Skeleton width={"50%"} height={"35px"} />
                  </Grid>
                )}
              </FilterBox>
            </Grid>
          </Grid>
        </Grid>
      </PageTemplate>
    </>
  );
};
