import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../context/CourseContext";
import { CategoryContext } from "../context/CategoryContext";
import CourseCard from "../components/CourseCard";
import {
  Stack,
  Pagination,
  Container,
  Box,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslationContext } from "../context/TranslationContext";

function CourseList() {
  const { t } = useTranslationContext();
  const {
    courses,
    getCoursesByPagination,
    getTotalCourseCount,
    totalCourseCount,
  } = useContext(CourseContext);
  const { categoryWithCourses, getAllCategoriesWithCourses } =
    useContext(CategoryContext);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const pageSize = 6;

  useEffect(() => {
    getCoursesByPagination(page, pageSize, selectedCategories);
    getTotalCourseCount(selectedCategories);
    getAllCategoriesWithCourses();
  }, [page, selectedCategories]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchTerm("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setPage(1);
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return []; // If clicking the selected category, deselect it
      } else {
        return [categoryId]; // Select only the new category
      }
    });
  };

  const filteredCourses = courses?.data?.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const effectiveTotalCount = searchTerm
    ? filteredCourses?.length
    : totalCourseCount;
  const totalPages = Math.ceil(effectiveTotalCount / pageSize);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        py: 4,
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" spacing={3}>
          {/* Sol Sidebar - Kategoriler */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              width: 280,
              height: "fit-content",
              display: { xs: "none", md: "block" },
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t("courseList.categories")}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <FormGroup>
              {categoryWithCourses?.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                  }
                  label={category.name}
                  sx={{ mb: 1 }}
                />
              ))}
            </FormGroup>
          </Paper>
          <Stack spacing={3} sx={{ flex: 1 }}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                placeholder={t("courseList.searchPlaceholder")}
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: "300px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {(searchTerm || selectedCategories.length > 0) && (
                <Tooltip title={t("courseList.clearFilters")}>
                  <IconButton onClick={clearFilters} size="small">
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Paper>
            {/* Kurs Kartları Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
              }}
            >
              {filteredCourses?.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </Box>
            {/* Pagination */}
            <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default CourseList;
