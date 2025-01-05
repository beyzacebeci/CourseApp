import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import { CourseContext } from "../context/CourseContext";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import { useTranslationContext } from "../context/TranslationContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SaveIcon from "@mui/icons-material/Save";

const CourseForm = () => {
  const { getAllCategoriesWithCourses, categoryWithCourses } =
    useContext(CategoryContext);
  const { getCourseById, updateCourse, createCourse } =
    useContext(CourseContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslationContext();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    base64Image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getAllCategoriesWithCourses();

    if (id) {
      const fetchCourse = async () => {
        const courseData = await getCourseById(id);
        if (courseData) {
          setCourse(courseData);
        }
      };
      fetchCourse();
    }
  }, [id]);

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || "",
        description: course.description || "",
        price: course.price || "",
        categoryId: course.categoryId ? course.categoryId.toString() : "",
        base64Image: course.base64Image || "",
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          base64Image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      let result;
      if (id) {
        result = await updateCourse(id, formData);
      } else {
        result = await createCourse(formData);
      }

      if (result.success) {
        setSuccess(
          id ? t("courseForm.success.update") : t("courseForm.success.add")
        );
        setTimeout(() => navigate("/educator"), 500);
      } else {
        setError(result.error || t("courseForm.error.general"));
      }
    } catch (err) {
      setError(t("courseForm.error.general"));
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {id ? t("courseForm.update") : t("courseForm.addNew")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="name"
              label={t("courseForm.name")}
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="description"
              label={t("courseForm.description")}
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              fullWidth
            />

            <TextField
              name="price"
              label={t("courseForm.price")}
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
            />

            <FormControl fullWidth required>
              <InputLabel>{t("courseForm.category")}</InputLabel>
              <Select
                name="categoryId"
                value={formData.categoryId || ""}
                onChange={handleChange}
              >
                {categoryWithCourses?.map((category) => (
                  <MenuItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Button
                variant="contained"
                component="label"
                color="secondary"
                startIcon={<AddPhotoAlternateIcon />}
              >
                {t("courseForm.selectImage")}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </FormControl>

            {formData.base64Image && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={formData.base64Image}
                  alt="Course preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              {id ? t("courseForm.updateButton") : t("courseForm.add")}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default CourseForm;
