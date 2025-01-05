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
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useTranslationContext } from "../context/TranslationContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const Educator = () => {
  const {
    courses,
    getCoursesByPagination,
    getTotalCourseCount,
    totalCourseCount,
    deleteCourse,
  } = useContext(CourseContext);
  const {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategoriesWithCourses,
    categoryWithCourses,
  } = useContext(CategoryContext);
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
  const { t } = useTranslationContext();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

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

  useEffect(() => {
    if (categoryDialogOpen) {
      getAllCategoriesWithCourses();
    }
  }, [categoryDialogOpen]);

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
          ? t("educator.notifications.deleteSuccess")
          : t("educator.notifications.deleteError"),
        severity: success ? "success" : "error",
      });

      if (success) {
        getCoursesByPagination(page, pageSize);
        getTotalCourseCount();
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAddCategory = async () => {
    setCategoryError("");

    if (!newCategory.trim()) {
      setCategoryError(t("validation.required"));
      return;
    }

    const result = await createCategory({ name: newCategory });
    if (result.success) {
      setSnackbar({
        open: true,
        message: t("educator.notifications.categoryAddSuccess"),
        severity: "success",
      });
      setCategoryDialogOpen(false);
      setNewCategory("");
    } else {
      setSnackbar({
        open: true,
        message: result.error || t("educator.notifications.categoryAddError"),
        severity: "error",
      });
    }
  };

  const handleEditCategory = async (category) => {
    if (!editingCategory?.name?.trim()) {
      setCategoryError(t("validation.required"));
      return;
    }

    const result = await updateCategory(category.id, {
      name: editingCategory.name,
    });
    if (result.success) {
      setSnackbar({
        open: true,
        message: t("educator.notifications.categoryUpdateSuccess"),
        severity: "success",
      });
      getAllCategoriesWithCourses();
      setEditingCategory(null);
    } else {
      setSnackbar({
        open: true,
        message:
          result.error || t("educator.notifications.categoryUpdateError"),
        severity: "error",
      });
    }
  };

  const handleDeleteCategory = async (category) => {
    const result = await deleteCategory(category.id);
    if (result.success) {
      setSnackbar({
        open: true,
        message: t("educator.notifications.categoryDeleteSuccess"),
        severity: "success",
      });
      getAllCategoriesWithCourses();
    } else {
      setSnackbar({
        open: true,
        message:
          result.error || t("educator.notifications.categoryDeleteError"),
        severity: "error",
      });
    }
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
            <Stack direction="row" alignItems="center" spacing={1}>
              <Tooltip title={t("common.back")}>
                <IconButton onClick={() => navigate("/")} color="primary">
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h5" component="h1">
                {t("educator.allCourses")}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Tooltip title={t("educator.addNewCategory")}>
                <IconButton
                  color="secondary"
                  size="large"
                  onClick={() => setCategoryDialogOpen(true)}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("educator.addNewCourse")}>
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => navigate("/courses/new")}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Stack>
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

          <Dialog
            open={categoryDialogOpen}
            onClose={() => {
              setCategoryDialogOpen(false);
              setCategoryError("");
              setNewCategory("");
              setEditingCategory(null);
            }}
            aria-labelledby="add-category-dialog-title"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="add-category-dialog-title">
              {t("educator.addCategory.title")}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label={t("educator.addCategory.name")}
                type="text"
                fullWidth
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setCategoryError("");
                }}
                error={!!categoryError}
                helperText={categoryError}
                required
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                  mb: 2,
                }}
              >
                <Button
                  onClick={() => {
                    setCategoryDialogOpen(false);
                    setCategoryError("");
                    setNewCategory("");
                    setEditingCategory(null);
                  }}
                  sx={{ mr: 1 }}
                >
                  {t("educator.addCategory.cancel")}
                </Button>
                <Button
                  onClick={handleAddCategory}
                  variant="contained"
                  color="primary"
                >
                  {t("educator.addCategory.add")}
                </Button>
              </Box>

              <List>
                {categoryWithCourses?.map((category) => (
                  <ListItem
                    key={category.id}
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        {editingCategory?.id === category.id ? (
                          <>
                            <IconButton
                              edge="end"
                              color="primary"
                              onClick={() => handleEditCategory(category)}
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              onClick={() => setEditingCategory(null)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton
                              edge="end"
                              onClick={() =>
                                setEditingCategory({
                                  id: category.id,
                                  name: category.name,
                                })
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              color="error"
                              onClick={() => handleDeleteCategory(category)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </Stack>
                    }
                  >
                    {editingCategory?.id === category.id ? (
                      <TextField
                        fullWidth
                        value={editingCategory.name}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        }
                        size="small"
                      />
                    ) : (
                      <ListItemText primary={category.name} />
                    )}
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </Dialog>
        </Paper>
      </Container>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        disableEnforceFocus
        disableRestoreFocus
      >
        <DialogTitle id="delete-dialog-title">
          {t("educator.deleteDialog.title")}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {t("educator.deleteDialog.confirmMessage", {
              courseName: courseToDelete?.name,
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} autoFocus>
            {t("educator.deleteDialog.cancelButton")}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            {t("educator.deleteDialog.deleteButton")}
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
