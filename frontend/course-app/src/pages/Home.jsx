import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CourseList from "./CourseList";
import { useAuth } from "../context/AuthContext";
import { useTranslationContext } from "../context/TranslationContext";

function Home() {
  const { user } = useAuth();
  const { t } = useTranslationContext();

  return (
    <div>
      <Box
        sx={{
          height: "calc(100vh - 80px)",
          width: "100%",
          bgcolor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {user && (
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              color: "#2c3e50",
              fontWeight: "500",
            }}
          >
            {t("home.welcome", { username: user.username })}
          </Typography>
        )}

        <IconButton
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
          size="large"
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            backgroundColor: "grey",
            color: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          <ArrowDownwardIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      <CourseList />
    </div>
  );
}

export default Home;
