import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useAuth } from "../context/AuthContext";
import { useTranslationContext } from "../context/TranslationContext";
import { Alert, Snackbar } from "@mui/material";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const { t } = useTranslationContext();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    userName: false,
    password: false,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (!formData.userName || !formData.password) {
      setSnackbarMessage(t("validation.fillAllFields"));
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setTouched({
        userName: true,
        password: true,
      });
      return;
    }

    try {
      const result = await login(formData);
      if (result.success) {
        setSnackbarMessage(t("signIn.success"));
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setSnackbarMessage(t(result.message));
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setSnackbarMessage(t("signIn.error"));
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
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
            {t("signIn.title")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack spacing={2}>
              <TextField
                required
                value={formData.userName}
                onChange={handleChange}
                onBlur={() => handleBlur("userName")}
                error={touched.userName && !formData.userName}
                helperText={
                  touched.userName && !formData.userName
                    ? t("validation.required")
                    : ""
                }
                fullWidth
                id="username"
                label={t("signIn.username")}
                name="userName"
                autoComplete="username"
                autoFocus
              />
              <TextField
                required
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                error={touched.password && !formData.password}
                helperText={
                  touched.password && !formData.password
                    ? t("validation.required")
                    : ""
                }
                fullWidth
                name="password"
                label={t("signIn.password")}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained">
                {t("signIn.submit")}
              </Button>
              <Stack direction="row" justifyContent="flex-end">
                <Link href="/signup-page" variant="body2">
                  {t("signIn.noAccount")}
                </Link>
              </Stack>
            </Stack>
          </Box>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Stack>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
