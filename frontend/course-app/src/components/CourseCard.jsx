import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslationContext } from "../context/TranslationContext";

function CourseCard({ course }) {
  const navigate = useNavigate();
  const { t } = useTranslationContext();
  const placeholderImage = "https://via.placeholder.com/250";

  const getImageSource = () => {
    if (course.base64Image) {
      return course.base64Image;
    }
    return course.imageUrl || placeholderImage;
  };

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="150"
          image={getImageSource()}
          alt={course.name}
          onError={handleImageError}
          sx={{
            objectFit: "cover",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {t("course.price", { price: course.price })}
        </Typography>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            fontSize: "1.1rem",
            mb: 1,
          }}
        >
          {course.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            fontSize: "0.875rem",
          }}
        >
          {course.description}
        </Typography>
        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            {t("course.details")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
