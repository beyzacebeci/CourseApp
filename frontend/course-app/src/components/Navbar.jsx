import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import courseIcon from "./course.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Navbar() {
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        height: "80px",
        boxShadow: "none",
        borderBottom: "1px solid #908f8f",
        pt: 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="/">
            <img
              src={courseIcon}
              alt="Course Logo"
              width="60px"
              style={{ display: "block", marginLeft: "16px" }}
            />
          </a>
          <Typography variant="h6" sx={{ ml: 2, mr: 5, fontWeight: "bold" }}>
            Course App
          </Typography>
          <Button
            color="inherit"
            href="/home"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Home
          </Button>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            href="/admin-page"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Educator
          </Button>
          <Button
            color="inherit"
            href="/user-estate-list-page"
            sx={{
              textTransform: "none",
              fontSize: "16px",
              ml: 1,
            }}
          >
            Courses
          </Button>

          <Button
            color="inherit"
            href="/create-new-estate"
            sx={{
              textTransform: "none",
              fontSize: "16px",
              ml: 1,
            }}
          >
            <ShoppingCartOutlinedIcon />
          </Button>

          <Button
            color="inherit"
            href="/signin-page"
            sx={{
              textTransform: "none",
              fontSize: "16px",
              ml: 1,
            }}
          >
            Sign In
          </Button>

          <Button
            color="inherit"
            href="/signup-page"
            sx={{
              textTransform: "none",
              fontSize: "16px",
              ml: 1,
            }}
          >
            Sign Up
          </Button>

          <IconButton
            edge="end"
            color="inherit"
            href="/login"
            aria-controls="language-menu"
            aria-haspopup="true"
            sx={{
              "&:hover": {
                border: "0.5px solid black",
              },
              ml: 2,
              mr: 1,
              width: "48px",
              height: "48px",
              padding: 0,
            }}
          >
            <AccountCircleIcon sx={{ width: "100%", height: "100%" }} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
