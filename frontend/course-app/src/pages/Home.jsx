import { Box, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Carousel from "react-material-ui-carousel";
import CourseList from "./CourseList";
import { useAuth } from "../context/AuthContext";
import { useTranslationContext } from "../context/TranslationContext";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";

function Home() {
  const { user } = useAuth();
  const { t } = useTranslationContext();

  const items = [
    {
      name: t("home.carousel.slide1.title"),
      image: slide1,
      description: t("home.carousel.slide1.description"),
      showButton: true,
    },
    {
      name: t("home.carousel.slide2.title"),
      image: slide2,
      description: t("home.carousel.slide2.description"),
      showButton: false,
    },
  ];

  return (
    <div>
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          width: "100%",
          bgcolor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          overflow: "auto",
        }}
      >
        <Box sx={{ width: "80%", maxWidth: 1200 }}>
          <Carousel
            navButtonsProps={{
              style: {
                backgroundColor: "#424242",
                opacity: 1,
              },
            }}
            navButtonsWrapperProps={{
              style: {
                opacity: 1,
              },
            }}
            indicatorContainerProps={{
              style: {
                marginTop: "10px",
              },
            }}
          >
            {items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  height: 450,
                  width: "100%",
                  backgroundColor: "#e0e0e0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                  marginTop: "20px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    padding: "24px 32px",
                    maxWidth: "40%",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    margin: "0 0 0 80px",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#1c1d1f",
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#1c1d1f",
                    }}
                  >
                    {item.description}
                  </Typography>
                  {item.showButton && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        const currentPosition = window.scrollY;
                        const windowHeight = window.innerHeight;
                        window.scrollTo({
                          top: currentPosition + windowHeight,
                          behavior: "smooth",
                        });
                      }}
                      sx={{
                        mt: 2,
                        backgroundColor: "#424242",
                        "&:hover": {
                          backgroundColor: "#616161",
                        },
                      }}
                    >
                      {t("home.viewCourses")}
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Carousel>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#2c3e50",
                fontWeight: "600",
                mb: 2,
                fontSize: "2rem",
              }}
            >
              {t("home.infoSection.title")}
              <hr />
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                fontSize: "1.4rem",
              }}
            >
              {t("home.infoSection.description")}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={() => {
            const currentPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            window.scrollTo({
              top: currentPosition + windowHeight,
              behavior: "smooth",
            });
          }}
          size="large"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <ArrowDownwardIcon fontSize="medium" />
        </IconButton>
      </Box>

      <CourseList />
    </div>
  );
}

export default Home;
