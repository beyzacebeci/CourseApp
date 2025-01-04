import React, { useState } from "react";
import {
  Container,
  Snackbar,
  Alert,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import UserInfoCard from "../components/profile/UserInfoCard";
import PasswordChangeCard from "../components/profile/PasswordChangeCard";
import OrdersCard from "../components/profile/OrdersCard";

function Profile() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: { xs: "1", md: "2" } }}>
              <UserInfoCard setSnackbar={setSnackbar} />
            </Box>
            <Box sx={{ flex: "1" }}>
              <PasswordChangeCard setSnackbar={setSnackbar} />
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <OrdersCard />
          </Box>
        </Box>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default Profile;
