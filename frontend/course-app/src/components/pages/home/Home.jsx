import { Box, IconButton } from "@mui/material";
import React from "react";
import CourseList from "../course-list/CourseList";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Home() {
  return (
    <div>
      <Box
        sx={{
          height: "calc(100vh - 80px)",
          width: "100%",
          bgcolor: "#f5f5f5", // açık, flu gri
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
