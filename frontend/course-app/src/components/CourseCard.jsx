import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

function CourseCard({ course }) {
  const placeholderImage = "https://via.placeholder.com/250";

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={course.imageUrl || placeholderImage}
        alt={course.name}
        onError={handleImageError}
        sx={{
          objectFit: "cover",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      />
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
        <Box sx={{ mt: 1.5 }}>
          <Typography variant="subtitle1" color="primary">
            {course.price} TL
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
