import styled from "styled-components";
import { hexToRgba } from "../styles/_mixin";
import { _variables } from "../styles/_variables";
import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { ContentWrapper } from "../components/ContentWrapper";
import { Logo } from "../components/Logo";
import { Link as LinkSPA, useHistory } from "react-router-dom";
import * as yup from "yup";
import { motion } from "framer-motion";
import { upToDownFn } from "../lib/animations/upToDownAnimate";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { userService } from "../../service/user/user";
import { selectUserData, setUserData } from "../../service/store/userSlice";

const Main = styled.main`
  width: 100%;
  height: 100vh;
  background-color: rgba(${hexToRgba(_variables.primaryColor, 1)});
  display: flex;
  align-items: center;
  justify-content: center;

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
  email: yup
    .string()
    .email("Необходимо ввести корректный email")
    .required("Поле обязательно для заполнения"),
  password: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(6, "Минимум 6 символов"),
  confirmPassword: yup
    .string()
    .required("Поле обязательно для заполнения")
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

export const RegisterPage: CT<unknown> = () => {
  const dispatch = useAppDispatch();
  const [isLoad, setLoad] = useState(false);
  const history = useHistory();
  const snackbar = useSnackbar();
  const userData = useAppSelector(selectUserData);
  useEffect(() => {
    if (userService.isAuth() && userData) {
      history.push("/");
    }
  }, []);
  const formSubmitHandler = async (values: {
    email: string;
    fio: string;
    password: string;
    role: number;
  }) => {
    setLoad(true);

    try {
      const data = await userService.register(values);
      localStorage.setItem("userEmail", data.data.user.email);
      snackbar.enqueueSnackbar("Успешная регистрация", { variant: "success" });
      setTimeout(() => {
        history.push("/login");
      }, 700);
    } catch (e) {
      formik.setErrors({ email: "Такой пользователь уже существует" });
    } finally {
      setLoad(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      fio: "",
      password: "",
      confirmPassword: "",
      role: 3,
    },
    onSubmit: formSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
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
              <Typography variant={"h5"}>Регистрация</Typography>
            </Grid>

            <Grid item xs={12}>
              <Form noValidate onSubmit={formik.handleSubmit} action="">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      id="email"
                      error={!!formik.errors.email}
                      helperText={formik.errors.email}
                      type={"email"}
                      label="Email"
                      onChange={formik.handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      id="fio"
                      error={!!formik.errors.fio}
                      helperText={formik.errors.fio}
                      type={"text"}
                      label="ФИО"
                      onChange={formik.handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      id="password"
                      error={!!formik.errors.password}
                      helperText={formik.errors.password}
                      type={"password"}
                      onChange={formik.handleChange}
                      label="Пароль"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      id="confirmPassword"
                      error={!!formik.errors.confirmPassword}
                      helperText={formik.errors.confirmPassword}
                      type={"password"}
                      onChange={formik.handleChange}
                      label="Повторите пароль"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="role"
                      value={formik.values.role}
                      color={"primary"}
                      fullWidth
                      onChange={(e) => {
                        formik.setFieldValue("role", e.target.value);
                      }}
                    >
                      <MenuItem value={2}>
                        Представитель транспорта Москвы
                      </MenuItem>
                      <MenuItem value={3}>Участник</MenuItem>
                    </Select>
                  </Grid>
                  <Grid justifyContent={"flex-end"} item xs={12}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <LinkSPA to={"/login"}>
                        <Link>
                          <Typography>Войти</Typography>
                        </Link>
                      </LinkSPA>
                      <Button
                        size={"large"}
                        disabled={isLoad}
                        variant={"contained"}
                        color={"primary"}
                        type={"submit"}
                      >
                        Регистрация
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
