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

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >
            <Stack spacing={2}>
              <TextField
                value={formData.userName}
                onChange={handleChange}
                fullWidth
                id="username"
                label="Username"
                name="userName"
                autoComplete="username"
                autoFocus
              />
              <TextField
                value={formData.password}
                onChange={handleChange}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained">
                Sign In
              </Button>
              <Stack direction="row" justifyContent="flex-end">
                <Link href="/signup-page" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
