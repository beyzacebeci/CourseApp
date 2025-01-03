import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import courseIcon from "./course.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAuth } from "../context/AuthContext";
import Badge from "@mui/material/Badge";
import { useBasket } from "../context/BasketContext";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isEducator = user?.roles?.includes("Educator");
  const { basketCount, resetBasket } = useBasket();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    await logout();
    resetBasket();
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
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
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
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
            <Link
              to="/admin-page"
              style={{ textDecoration: "none", color: "black" }}
            >
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

          <Link
            to="/user-estate-list-page"
            style={{ textDecoration: "none", color: "black" }}
          >
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
            <div
              onMouseEnter={handleMenuOpen}
              onMouseLeave={handleMenuClose}
              style={{ display: "flex", alignItems: "center" }}
            >
              <IconButton
                edge="end"
                color="inherit"
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

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                MenuListProps={{
                  onMouseEnter: () => setAnchorEl(anchorEl),
                  onMouseLeave: handleMenuClose,
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiMenuItem-root": {
                      px: 2,
                      py: 1,
                    },
                  },
                }}
              >
                <MenuItem onClick={handleProfileClick}>Profilim</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
