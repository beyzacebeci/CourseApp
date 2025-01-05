import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useTranslationContext } from "../context/TranslationContext";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  Link,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

const defaultTheme = createTheme();

export default function SignUp() {
  const { t } = useTranslationContext();
  const { handleAddUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    userName: "",
    password: "",
    roles: ["User"],
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, surname, email, userName, password } = formData;
    if (!name || !surname || !email || !userName || !password) {
      setSnackbarMessage(t("validation.fillAllFields"));
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const result = await handleAddUser(formData);
    if (result.success) {
      setSnackbarMessage(t(result.message));
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage(t(result.message));
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Stack
          sx={{
            marginTop: 8,
            alignItems: "center",
          }}
          spacing={2}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signUp.title")}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={formData.name}
                  fullWidth
                  id="name"
                  label={t("signUp.firstName")}
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  id="surname"
                  value={formData.surname}
                  label={t("signUp.lastName")}
                  name="surname"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Stack>
              <TextField
                fullWidth
                id="email"
                value={formData.email}
                label={t("signUp.email")}
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                id="username"
                value={formData.userName}
                label={t("signUp.username")}
                name="userName"
                autoComplete="username"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                value={formData.password}
                name="password"
                label={t("signUp.password")}
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
              <Button type="submit" fullWidth variant="contained">
                {t("signUp.submit")}
              </Button>
              <Stack direction="row" justifyContent="flex-end">
                <Link href="/signin-page" variant="body2">
                  {t("signUp.haveAccount")}
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
