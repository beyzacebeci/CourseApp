import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import { Stack, Pagination, Container, Box } from "@mui/material";

function CourseList() {
  const {
    courses,
    getCoursesByPagination,
    getTotalCourseCount,
    totalCourseCount,
  } = useContext(CourseContext);
  const [page, setPage] = useState(1);
  const pageSize = 6; // Her sayfada gösterilecek kurs sayısı

  useEffect(() => {
    getCoursesByPagination(page, pageSize);
    getTotalCourseCount();
    console.log(totalCourseCount);
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(totalCourseCount / pageSize);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        width: "100%",
        bgcolor: "#f5f5f5",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack direction="row" flexWrap="wrap" gap={3}>
            {courses?.data?.map((course) => (
              <Box
                key={course.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 24px)",
                    md: "calc(33.333% - 24px)",
                  },
                }}
              >
                <CourseCard course={course} />
              </Box>
            ))}
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default CourseList;
