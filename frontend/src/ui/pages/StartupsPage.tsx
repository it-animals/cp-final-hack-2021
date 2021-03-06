import { PageTemplate } from "../components/PageTemplate";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
  Tab,
  Tabs,
  TextField,
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
import { tagsService } from "../../service/tag/tags";
import { TopLine } from "../components/TopLine";
import { useAppSelector } from "../../service/store/store";
import { selectUserData } from "../../service/store/userSlice";
import { userIsAdmin } from "../../domain/user";
import { appConfig } from "../../config";
import { Link } from "react-router-dom";
import { useTitle } from "react-use";

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

const RequestButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
const StartupElem = motion(Startup);

export const StartupsPage = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [isLoad, setLoad] = useState(false);
  const [data, setData] = useState<ProjectType[]>([]);
  const [tagData, setTagData] = useState<ProjectType["tags"]>([]);
  const snackbar = useSnackbar();
  const userData = useAppSelector(selectUserData);
  const [filterState, setFilterState] = useUrlState({
    status: "0",
    search: "",
    type: "0",
    sort: "-id",
    tags: "",
  });

  useTitle("????????????????" + appConfig.titleApp);

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
      snackbar.enqueueSnackbar("????, ?????????????????? ????????????. ???????????????????? ?????? ??????", {
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
      snackbar.enqueueSnackbar("???????????? ???????????????? ??????????. ???????????????????? ?????? ??????", {
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
    //eslint-disable-next-line
  }, [filterState]);

  useEffect(() => {
    loadTags();
    setInputSearch(filterState.search);
    //eslint-disable-next-line
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

  return (
    <>
      <PageTemplate>
        <TopLine>
          {userData?.user && userIsAdmin(userData.user) && (
            <a href={appConfig.adminPanelUrl}>
              <Button variant={"outlined"}>???????????? ????????????????????????????</Button>
            </a>
          )}
          <Link to={"/requests"}>
            <Button variant={"outlined"}>???????????????? ??????????????</Button>
          </Link>
        </TopLine>

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
                label="??????????"
                variant="standard"
              />
            </Box>
            <ButtonWrapper>
              <Button variant={"contained"} onClick={searchClickHandler}>
                ??????????
              </Button>
              <Button
                onClick={clearSearchHandler}
                color={"secondary"}
                variant={"contained"}
              >
                ????????????????
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
              <TabCustom label="??????" />
              <TabCustom label="????????" />
              <TabCustom label="????????????????" />
              <TabCustom label="??????????????" />
              <TabCustom label="????????????" />
              <TabCustom label="??????????????????" />
            </TabList>
            <List id={"list"}>
              {isLoad && <Loader height={260} />}
              {!data.length && !isLoad && (
                <>
                  <NotFound />
                  <RequestButtonWrapper>
                    <Link to={"/request"}>
                      <Button variant={"contained"}>?????????????????? ????????????</Button>
                    </Link>
                  </RequestButtonWrapper>
                </>
              )}
              {data &&
                !!data.length &&
                data.map((item) => <StartupElem key={item.id} {...item} />)}
            </List>
          </Grid>
          <Grid item xs={4} mt={4}>
            <Grid item xs={12}>
              <FilterBox title={"?????????????????????? ????"}>
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
                      label="???????? ????????????????"
                    />
                    <FormControlLabel
                      value="name"
                      control={<Radio />}
                      label="????????????????"
                    />
                  </RadioGroup>
                </FormControl>
              </FilterBox>
            </Grid>
            <Grid item xs={12} mt={1}>
              <FilterBox title={"??????????????????????"}>
                <RadioGroup
                  aria-label="gender"
                  defaultValue={filterState.type}
                  name="radio-buttons-group"
                  onChange={(event, value) => {
                    setFilterState({ ...filterState, type: String(value) });
                  }}
                >
                  <FormControlLabel value="0" control={<Radio />} label="??????" />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="?????????????????? ?? ???????????????????? ?????????????????? ??????????????????"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="?????????? ???????? ??????????????????????"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="???????????????????????? ?????????????????? ????????????????"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="???????????????? ?????????? ?? ????????????????"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="???????????????? ???????????????????? ?? ????????????????????"
                  />
                </RadioGroup>
              </FilterBox>
            </Grid>
            <Grid item xs={12} mt={1}>
              <FilterBox title={"????????"}>
                {tagData.length > 0 && (
                  <FormGroup>
                    {tagData.map((item) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filterState.tags
                              .split(",")
                              .includes(String(item.id))}
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
