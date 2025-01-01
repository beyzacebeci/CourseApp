import { createContext, useState } from "react";
import { getAPI } from "../services/apiService";

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [totalCourseCount, setTotalCourseCount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbar = (message, severity = "error") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const getCoursesByPagination = async (pageNumber, pageSize) => {
    try {
      const response = await getAPI(`Courses/${pageNumber}/${pageSize}`);
      if (response.status === 200) {
        setCourses(response.data);
        console.log(response.data);
      } else {
        handleSnackbar("Kursları getirirken bir hata oluştu");
      }
      return response;
    } catch (error) {
      handleSnackbar(`Hata oluştu: ${error.message}`);
      return error;
    }
  };

  const getTotalCourseCount = async () => {
    try {
      const response = await getAPI("Courses/totalCount");
      console.log("API Yanıtı:", response);
      if (response.status === 200) {
        setTotalCourseCount(parseInt(response.data.data));
      } else {
        handleSnackbar("Toplam kurs sayısını getirirken bir hata oluştu");
      }
      return response;
    } catch (error) {
      handleSnackbar(`Hata oluştu: ${error.message}`);
      return error;
    }
  };

  const values = {
    courses,
    course,
    getCoursesByPagination,
    snackbar,
    setSnackbar,
    totalCourseCount,
    getTotalCourseCount,
  };

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
}
