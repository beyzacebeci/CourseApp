import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../context/CourseContext";
import { CategoryContext } from "../context/CategoryContext";
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Educator = () => {
  const {
    courses,
    getCoursesByPagination,
    getTotalCourseCount,
    totalCourseCount,
    deleteCourse,
  } = useContext(CourseContext);
  const { getCategory } = useContext(CategoryContext);
  const [page, setPage] = useState(1);
  const [categoryNames, setCategoryNames] = useState({});
  const pageSize = 6;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getCoursesByPagination(page, pageSize);
    getTotalCourseCount();
  }, [page]);

  useEffect(() => {
    const fetchCategoryNames = async () => {
      if (courses?.data) {
        const names = {};
        for (const course of courses.data) {
          if (course.categoryId) {
            const response = await getCategory(course.categoryId);
            names[course.categoryId] = response.data.data.name;
          }
        }
        setCategoryNames(names);
      }
    };
    fetchCategoryNames();
  }, [courses]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(totalCourseCount / pageSize);

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      const success = await deleteCourse(courseToDelete.id);
      setDeleteDialogOpen(false);

      setSnackbar({
        open: true,
        message: success
          ? "Course deleted successfully"
          : "Failed to delete course",
        severity: success ? "success" : "error",
      });

      if (success) {
        // Refresh the current page
        getCoursesByPagination(page, pageSize);
        getTotalCourseCount();
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 4, minHeight: "calc(100vh - 80px)" }}>
      <Container maxWidth="lg">
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" component="h1">
              All Courses
            </Typography>
            <Tooltip title="Add New Course">
              <IconButton
                color="primary"
                size="large"
                onClick={() => navigate("/courses/new")}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack spacing={2}>
            {courses?.data?.map((course) => (
              <Card key={course.id} sx={{ display: "flex", p: 2 }}>
                <Box
                  component="img"
                  sx={{
                    width: 200,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                  src={course.base64Image || "default-course-image.jpg"}
                  alt={course.name}
                />
                <CardContent sx={{ flex: 1, pl: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={`${course.price} TL`}
                          color="primary"
                          size="small"
                        />
                        <Chip
                          label={
                            categoryNames[course.categoryId] || "Uncategorized"
                          }
                          variant="outlined"
                          size="small"
                        />
                      </Stack>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit Course">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/courses/edit/${course.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Course">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(course)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Stack>
        </Paper>
      </Container>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        disableEnforceFocus
        disableRestoreFocus
      >
        <DialogTitle id="delete-dialog-title">Delete Course</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{courseToDelete?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} autoFocus>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Educator;
