import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import courseIcon from "./course.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAuth } from "../context/AuthContext";
import Badge from "@mui/material/Badge";
import { useBasket } from "../context/BasketContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isEducator = user?.roles?.includes("Educator");
  const { basketCount } = useBasket();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

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
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src={courseIcon}
              alt="Course Logo"
              width="60px"
              style={{ display: "block", marginLeft: "16px" }}
            />
          </Link>
          <Typography variant="h6" sx={{ ml: 2, mr: 5, fontWeight: "bold" }}>
            Course App
          </Typography>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Home
            </Button>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {isEducator && (
            <Link to="/admin-page" style={{ textDecoration: "none" }}>
              <Button
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Educator
              </Button>
            </Link>
          )}

          <Link to="/user-estate-list-page" style={{ textDecoration: "none" }}>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "16px",
                ml: 1,
              }}
            >
              Courses
            </Button>
          </Link>

          <Link to="/basket" style={{ textDecoration: "none" }}>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "16px",
                ml: 1,
              }}
            >
              <Badge badgeContent={basketCount} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Button>
          </Link>

          {!user ? (
            <>
              <Link to="/signin-page" style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    ml: 1,
                  }}
                >
                  Sign In
                </Button>
              </Link>

              <Link to="/signup-page" style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    ml: 1,
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontSize: "16px",
                ml: 1,
              }}
            >
              Logout
            </Button>
          )}

          {user && (
            <IconButton
              edge="end"
              color="inherit"
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
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
