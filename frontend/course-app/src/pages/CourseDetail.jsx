import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import { CategoryContext } from "../context/CategoryContext";
import { useTranslationContext } from "../context/TranslationContext";
import {
  Container,
  Typography,
  Paper,
  Box,
  CardMedia,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useBasket } from "../context/BasketContext";

function CourseDetail() {
  const { t } = useTranslationContext();
  const { id } = useParams();
  const { getCourseById } = useContext(CourseContext);
  const { getCategory } = useContext(CategoryContext);
  const { addToBasket } = useBasket();
  const [course, setCourse] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [userId] = useState(localStorage.getItem("userId"));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("warning");

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await getCourseById(id);
      if (courseData) {
        setCourse(courseData);
        const categoryResponse = await getCategory(courseData.categoryId);
        setCategoryName(categoryResponse?.data?.data?.name || "");
      }
    };
    fetchCourse();
  }, [id]);

  const handleAddToBasket = async () => {
    if (!userId) {
      setSnackbarMessage(t("courseDetail.loginRequired"));
      setSnackbarSeverity("warning");
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

      const result = await addToBasket(basketItem, userId);
      if (!result.success) {
        setSnackbarMessage(result.error);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
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
            image={course.base64Image || "https://via.placeholder.com/250"}
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
              {t("courseDetail.category", { categoryName: categoryName })}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {t("courseDetail.price", { price: course.price.toString() })}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {course.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToBasket}
              sx={{ mt: 2 }}
            >
              {t("courseDetail.addToBasket")}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CourseDetail;
