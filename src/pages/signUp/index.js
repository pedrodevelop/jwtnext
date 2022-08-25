import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Router from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

import { api } from "../../services/api";

const theme = createTheme();

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addToast } = useToasts();

  async function handleSignUp(data) {
    await api
      .post("users/register", data)
      .then(() => {
        Router.push("/");
      })
      .then(() => {
        addToast("Usuário cadastrado com sucesso", { appearance: "success" });
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSignUp)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("name", {
                    required: "Campo obrigatório",
                  })}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  autoFocus
                />
                {errors.name && errors.name.message}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("githubUser", {
                    required: "Campo obrigatório",
                  })}
                  required
                  fullWidth
                  id="githubUser"
                  label="Github User"
                  name="githubUser"
                />
                {errors.githubUser && errors.githubUser.message}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && errors.email.message}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                      message: "Senha inválida",
                      minLength: 8,
                    },
                  })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText="A senha deve conter 8 caracteres, uma letra e um número."
                />
                {errors.password && errors.password.message}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
