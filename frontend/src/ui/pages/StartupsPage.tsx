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
import { useState } from "react";
import { Loader } from "../components/Loader";

const List = styled.div`
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

export const StartupsPage = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [existSearch, setExitSearch] = useState(false);

  const changeSearchHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputSearch(e.currentTarget.value);
  };

  const searchClickHandler = () => {
    if (!inputSearch.length) return;
    // dispatch(filterPackage(inputSearch));
    setExitSearch(true);
  };

  const clearSearchHandler = () => {
    // dispatch(clearFilter());
    setInputSearch("");
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
              value={0}
              onChange={() => {}}
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
              <Startup />
              <Startup />
              <Startup />
              <Startup />
              <Startup />
              <Startup />
              <Startup />
              <Startup />
              <Startup />
              <Startup />
              <Startup />
              <Startup />
            </List>
          </Grid>
          <Grid item xs={4} mt={4}>
            <Grid item xs={12}>
              <FilterBox title={"Сортировать по"}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Дате создания"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Навазнию"
                    />
                  </RadioGroup>
                </FormControl>
              </FilterBox>
            </Grid>
            <Grid item xs={12} mt={1}>
              <FilterBox title={"Направление"}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Доступный и комфортный городской транспорт"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Новые виды мобильности"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Безопасность дорожного движения"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Здоровые улицы и экология"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Цифровые технологии в транспорте"
                  />
                </FormGroup>
              </FilterBox>
            </Grid>
          </Grid>
        </Grid>
      </PageTemplate>
    </>
  );
};
