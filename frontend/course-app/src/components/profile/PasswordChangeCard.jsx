import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";

function PasswordChangeCard({ setSnackbar }) {
  const { user } = useAuth();
  const { changePassword } = useUser();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setSnackbar({
        open: true,
        message: "Yeni şifreler eşleşmiyor",
        severity: "error",
      });
      return;
    }

    const result = await changePassword(user.userId, passwordForm);

    if (result.success) {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsChangingPassword(false);
    }

    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? "success" : "error",
    });
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Şifre Değiştir</Typography>
          <Button
            variant="outlined"
            onClick={() => setIsChangingPassword(!isChangingPassword)}
          >
            {isChangingPassword ? "İptal" : "Şifre Değiştir"}
          </Button>
        </Box>

        {isChangingPassword && (
          <Box component="form" onSubmit={handlePasswordChange} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Mevcut Şifre"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              required
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Yeni Şifre"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              required
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Yeni Şifre (Tekrar)"
              name="confirmNewPassword"
              value={passwordForm.confirmNewPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmNewPassword: e.target.value,
                })
              }
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Şifreyi Güncelle
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PasswordChangeCard;
