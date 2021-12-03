import styled from "styled-components";
import { _variables } from "../styles/_variables";
import { hexToRgba } from "../styles/_mixin";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { ContentWrapper } from "../components/ContentWrapper";
import { Logo } from "../components/Logo";
import { useFormik } from "formik";
import { Link as LinkSPA, useHistory } from "react-router-dom";
import { Link } from "@mui/material";
import * as yup from "yup";
import { motion } from "framer-motion";
import { upToDownFn } from "../lib/animations/upToDownAnimate";
import { userService } from "../../service/user/user";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { selectUserData, setUserData } from "../../service/store/userSlice";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { TextareaAutosize } from "@mui/material";
import { requestService } from "../../service/request/request";

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(${hexToRgba(_variables.primaryColor, 1)});

  &:after {
    width: 100%;
    filter: blur(0.2);
    height: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const FormWrapper = styled(motion(Paper))`
  position: relative;
  z-index: 2;
  width: 410px;
`;

const TopLine = styled.div`
  margin-bottom: 15px;
`;

const Form = styled.form`
  width: 100%;
  height: auto;
`;

const validationSchema = yup.object().shape({
  name: yup.string().required("Поле обязательно для заполнения"),
  description: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(6, "Минимум 6 символов"),
});

export const RequestPage: CT<unknown> = () => {
  const dispatch = useAppDispatch();
  const [isLoad, setLoad] = useState(false);
  const history = useHistory();
  const snackbar = useSnackbar();
  const userData = useAppSelector(selectUserData);

  const formSubmitHandler = async (values: {
    name: string;
    description: string;
  }) => {
    setLoad(true);

    try {
      const data = await requestService.create(values);
      snackbar.enqueueSnackbar("Запрос отправлен", { variant: "success" });
      setTimeout(() => {
        history.push("/");
      }, 700);
    } catch (e) {
      snackbar.enqueueSnackbar("Ошибка отправки запроса", { variant: "warning" });
      setTimeout(() => {
        history.push("/");
      }, 700);
    } finally {
      setLoad(false);
      localStorage.removeItem("userEmail");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: formSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema,
  });

  return (
    <Main>
      <FormWrapper {...upToDownFn()} variant="outlined" elevation={3}>
        <ContentWrapper>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TopLine>
                <Logo color={"primary"} />
              </TopLine>
            </Grid>

            <Grid item xs={10}>
              <Typography variant={"h5"}>Отправить запрос</Typography>
            </Grid>

            <Grid item xs={12}>
              <Form noValidate onSubmit={formik.handleSubmit} action="">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      id="name"
                      error={!!formik.errors.name}
                      helperText={formik.errors.name}
                      type={"text"}
                      label="Имя"
                      onChange={formik.handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      rows={"10"}
                      id="description"
                      error={!!formik.errors.description}
                      helperText={formik.errors.description}
                      type={"text"}
                      multiline
                      label="Описание"
                      onChange={formik.handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid justifyContent={"flex-end"} item xs={12}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Button
                        disabled={isLoad}
                        size={"large"}
                        variant={"contained"}
                        color={"primary"}
                        type={"submit"}
                      >
                        Отправить
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            </Grid>
          </Grid>
        </ContentWrapper>
      </FormWrapper>
    </Main>
  );
};
