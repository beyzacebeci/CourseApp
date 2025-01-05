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
import { useTranslationContext } from "../../context/TranslationContext";
import { VpnKey, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordChangeCard({ setSnackbar }) {
  const { user } = useAuth();
  const { changePassword } = useUser();
  const { t } = useTranslationContext();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setSnackbar({
        open: true,
        message: t("password.mismatchError"),
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
      message: t(result.message),
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VpnKey />
            <Typography variant="h6">{t("password.title")}</Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => setIsChangingPassword(!isChangingPassword)}
          >
            {isChangingPassword
              ? t("password.cancelButton")
              : t("password.changeButton")}
          </Button>
        </Box>

        {isChangingPassword && (
          <Box component="form" onSubmit={handlePasswordChange} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label={t("password.currentPassword")}
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              required
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: "action.active" }} />,
                endAdornment: (
                  <Button
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                  >
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              type={showPasswords.current ? "text" : "password"}
            />
            <TextField
              fullWidth
              margin="normal"
              label={t("password.newPassword")}
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              required
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: "action.active" }} />,
                endAdornment: (
                  <Button
                    onClick={() =>
                      setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                    }
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              type={showPasswords.new ? "text" : "password"}
            />
            <TextField
              fullWidth
              margin="normal"
              label={t("password.confirmPassword")}
              name="confirmNewPassword"
              value={passwordForm.confirmNewPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmNewPassword: e.target.value,
                })
              }
              required
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: "action.active" }} />,
                endAdornment: (
                  <Button
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              type={showPasswords.confirm ? "text" : "password"}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              {t("password.updateButton")}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PasswordChangeCard;
