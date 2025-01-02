import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import { CategoryContext } from "../context/CategoryContext";
import {
  Container,
  Typography,
  Paper,
  Box,
  CardMedia,
  Button,
} from "@mui/material";
import { useBasket } from "../context/BasketContext";

function CourseDetail() {
  const { id } = useParams();
  const { getCourseById } = useContext(CourseContext);
  const { getCategoryById } = useContext(CategoryContext);
  const { addToBasket } = useBasket();
  const [course, setCourse] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await getCourseById(id);
      if (courseData) {
        setCourse(courseData);
        const category = await getCategoryById(courseData.categoryId);
        setCategoryName(category?.name || "");
      }
    };
    fetchCourse();
  }, [id]);

  const handleAddToBasket = () => {
    if (course) {
      const basketItem = {
        id: course.id,
        name: course.name,
        price: course.price,
        description: course.description,
        categoryName: categoryName,
      };

      addToBasket(basketItem);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <CardMedia
            component="img"
            sx={{ width: 300, height: 200, objectFit: "cover" }}
            image="https://via.placeholder.com/250"
            alt={course.name}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {course.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Category: {categoryName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Price: {course.price} TL
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Description: {course.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToBasket}
              sx={{ mt: 2 }}
            >
              Sepete Ekle
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CourseDetail;
