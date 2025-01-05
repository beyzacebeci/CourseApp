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
import { useTranslationContext } from "../context/TranslationContext";
import trFlag from "../assets/tr.png";
import engFlag from "../assets/en.png";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isEducator = user?.roles?.includes("Educator");
  const { basketCount, resetBasket } = useBasket();
  const { t, changeLanguage, i18n } = useTranslationContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);

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

  const handleLangMenuOpen = (event) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    handleLangMenuClose();
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        height: "75px",
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
          <Typography
            variant="h6"
            sx={{
              ml: 2,
              mr: 3,
              fontWeight: "700",
              background: "linear-gradient(45deg, #1a237e 30%, #3949ab 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.5px",
            }}
          >
            CourseLab
          </Typography>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              {t("nav.home")}
            </Button>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {isEducator && (
            <Link
              to="/educator"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                {t("nav.educator", "Educator")}
              </Button>
            </Link>
          )}

          {user && (
            <Link
              to="/user-courses"
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
                {t("nav.courses", "Courses")}
              </Button>
            </Link>
          )}

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

          <Button
            color="inherit"
            onClick={handleLangMenuOpen}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              ml: 1,
            }}
          >
            <img
              src={i18n.language === "tr" ? trFlag : engFlag}
              alt="Selected Language"
              width="24px"
            />
          </Button>

          <Menu
            id="language-menu"
            anchorEl={langAnchorEl}
            open={Boolean(langAnchorEl)}
            onClose={handleLangMenuClose}
            disableScrollLock={true}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
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
            <MenuItem onClick={() => handleLanguageChange("en")}>
              <img
                src={engFlag}
                alt="English"
                width="24px"
                style={{ marginRight: "8px" }}
              />
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("tr")}>
              <img
                src={trFlag}
                alt="Türkçe"
                width="24px"
                style={{ marginRight: "8px" }}
              />
              Türkçe
            </MenuItem>
          </Menu>

          {!user ? (
            <>
              <Link to="/signin-page" style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    color: "black",
                    ml: 1,
                  }}
                >
                  {t("common.login")}
                </Button>
              </Link>

              <Link to="/signup-page" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    ml: 1,
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  {t("common.register")}
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
              {t("common.logout")}
            </Button>
          )}

          {user && (
            <div style={{ textAlign: "center" }}>
              <IconButton
                aria-label="profile menu"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                edge="end"
                color="inherit"
                sx={{
                  "&:hover": {
                    border: "0.5px solid black",
                  },
                  ml: 2,
                  width: "48px",
                  height: "48px",
                  padding: 0,
                }}
              >
                <AccountCircleIcon sx={{ width: "100%", height: "100%" }} />
              </IconButton>

              <Menu
                id="profile-menu"
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
                <MenuItem onClick={handleProfileClick}>
                  {t("nav.profile", "Profilim")}
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
