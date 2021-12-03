import styled from "styled-components";
import { _variables } from "../styles/_variables";
import { hexToRgba } from "../styles/_mixin";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { ContentWrapper } from "../components/ContentWrapper";
import { Logo } from "../components/Logo";
import { useFormik } from "formik";
import { Link as LinkSPA } from "react-router-dom";
import { Link } from "@mui/material";
import * as yup from "yup";
import { motion } from "framer-motion";
import { upToDownFn } from "../lib/animations/upToDownAnimate";

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
  email: yup
    .string()
    .required("Поле обязательно для заполнения")
    .email("Необходимо ввести корректный email"),
  password: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(6, "Минимум 6 символов"),
});

export const LoginPage: CT<unknown> = () => {
  const formSubmitHandler = async (values: {
    email: string;
    password: string;
  }) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
              <Typography variant={"h5"}>Вход</Typography>
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
                      id="password"
                      error={!!formik.errors.password}
                      helperText={formik.errors.password}
                      type={"password"}
                      onChange={formik.handleChange}
                      label="Пароль"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid justifyContent={"flex-end"} item xs={12}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <LinkSPA to={"/registration"}>
                        <Link>
                          <Typography>Регистрация</Typography>
                        </Link>
                      </LinkSPA>
                      <Button
                        size={"large"}
                        variant={"contained"}
                        color={"primary"}
                        type={"submit"}
                      >
                        Войти
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
