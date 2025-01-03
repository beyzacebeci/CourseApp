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
  Alert,
  Snackbar,
} from "@mui/material";
import { useBasket } from "../context/BasketContext";
import { useAuth } from "../context/AuthContext";

function CourseDetail() {
  const { id } = useParams();
  const { getCourseById } = useContext(CourseContext);
  const { getCategory } = useContext(CategoryContext);
  const { addToBasket } = useBasket();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await getCourseById(id);
      if (courseData) {
        setCourse(courseData);
        const response = await getCategory(courseData.categoryId);
        setCategoryName(response.data.data.name || "");
      }
    };
    fetchCourse();
  }, [id]);

  const handleAddToBasket = () => {
    if (!user) {
      setAlertMessage(
        "Ürünü Sepete ekleyip satın alma işlemini gerçekleştirebilmek için lütfen giriş yapın."
      );
      setAlertSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    if (course) {
      const basketItem = {
        id: course.id,
        name: course.name,
        price: course.price,
        description: course.description,
        categoryName: categoryName,
      };

      addToBasket(basketItem, user.userId);
      setAlertMessage("Ürün sepete eklendi");
      setAlertSeverity("success");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const getImageSource = () => {
    if (course?.base64Image) {
      return course.base64Image;
    }
    return course?.imageUrl || "https://via.placeholder.com/250";
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/250";
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
            image={getImageSource()}
            alt={course.name}
            onError={handleImageError}
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
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToBasket}
            sx={{ mt: 2, alignSelf: "flex-end" }}
          >
            Satın Al
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CourseDetail;
