import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
  Divider,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { getAPI } from "../../services/apiService";

function UserInfoCard({ setSnackbar }) {
  const { user, updateLocalUsername } = useAuth();
  const { updateUser } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await getAPI(`Users/${user.userId}`);
      if (response.success) {
        setUserDetails(response.data);
      }
    };

    if (user?.userId) {
      fetchUserDetails();
    }
  }, [user?.userId]);

  useEffect(() => {
    if (userDetails) {
      setEditForm({
        name: userDetails.name,
        surname: userDetails.surname,
        email: userDetails.email,
        userName: userDetails.userName,
        phoneNumber: userDetails.phoneNumber || "",
      });
    }
  }, [userDetails]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser(user.userId, editForm);

    if (result.success) {
      setUserDetails({ ...userDetails, ...editForm });
      setIsEditing(false);
      if (editForm.userName !== user.username) {
        updateLocalUsername(editForm.userName);
      }
    }

    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? "error" : "success",
    });
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "primary.main",
              }}
            >
              <PersonIcon />
            </Avatar>
            <Typography variant="h5" component="h2">
              Profil Bilgileri
            </Typography>
          </Box>
          <IconButton color="primary" onClick={() => setIsEditing(!isEditing)}>
            <EditIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {isEditing ? (
          <Box
            component="form"
            onSubmit={handleEditSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                required
                label="Ad"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                required
                label="Soyad"
                name="surname"
                value={editForm.surname}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Stack>

            <TextField
              fullWidth
              required
              label="E-posta"
              name="email"
              type="email"
              value={editForm.email}
              onChange={handleInputChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              required
              label="Kullanıcı Adı"
              name="userName"
              value={editForm.userName}
              onChange={handleInputChange}
              variant="outlined"
            />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button variant="outlined" onClick={() => setIsEditing(false)}>
                İptal
              </Button>
              <Button type="submit" variant="contained">
                Kaydet
              </Button>
            </Box>
          </Box>
        ) : (
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Kullanıcı Adı
              </Typography>
              <Typography variant="body1">{userDetails?.userName}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                E-posta
              </Typography>
              <Typography variant="body1">{userDetails?.email}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Ad Soyad
              </Typography>
              <Typography variant="body1">
                {`${userDetails?.name} ${userDetails?.surname}`}
              </Typography>
            </Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export default UserInfoCard;
