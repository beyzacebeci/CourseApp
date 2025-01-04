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

const CourseForm = () => {
  const { getAllCategoriesWithCourses, categoryWithCourses } =
    useContext(CategoryContext);
  const { getCourseById, updateCourse, createCourse } =
    useContext(CourseContext);
  const { id } = useParams(); // URL'den id parametresini al
  const [course, setCourse] = useState(null); // course state'i ekle
  const navigate = useNavigate();

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
    // Kategorileri yükle
    getAllCategoriesWithCourses();

    // Eğer id varsa (düzenleme modu), kursu getir
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
    // Kurs verisi geldiğinde form'u doldur
    if (course) {
      setFormData({
        name: course.name || "",
        description: course.description || "",
        price: course.price || "",
        categoryId: course.categoryId ? course.categoryId.toString() : "",
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
      let success;
      if (id) {
        // Güncelleme işlemi
        success = await updateCourse(id, formData);
      } else {
        // Yeni kurs ekleme işlemi
        const result = await createCourse(formData);
        success = result.success;
      }

      if (success) {
        setSuccess(
          id ? "Kurs başarıyla güncellendi" : "Kurs başarıyla eklendi"
        );
        setTimeout(() => navigate("/educator"), 1000);
      } else {
        setError(
          id
            ? "Kurs güncellenirken bir hata oluştu"
            : "Kurs eklenirken bir hata oluştu"
        );
      }
    } catch (err) {
      setError("Bir hata oluştu");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {id ? "Kurs Güncelle" : "Yeni Kurs Ekle"}
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
              label="Kurs Adı"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="description"
              label="Açıklama"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              fullWidth
            />

            <TextField
              name="price"
              label="Fiyat"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
            />

            <FormControl fullWidth required>
              <InputLabel>Kategori</InputLabel>
              <Select
                name="categoryId"
                value={formData.categoryId}
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
              <Button variant="contained" component="label" color="secondary">
                Resim Seç
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </FormControl>

            {/* Resim önizleme */}
            {formData.base64Image && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={formData.base64Image}
                  alt="Kurs resmi önizleme"
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
            >
              {id ? "Güncelle" : "Ekle"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default CourseForm;
