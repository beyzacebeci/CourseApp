import { createContext, useState } from "react";
import { getAPI, deleteAPI, putAPI, postAPI } from "../services/apiService";

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [totalCourseCount, setTotalCourseCount] = useState(0);

  const getCoursesByPagination = async (
    pageNumber,
    pageSize,
    categoryIds = []
  ) => {
    try {
      let url;
      if (categoryIds.length === 0) {
        url = `Courses/${pageNumber}/${pageSize}`;
      } else {
        const categoryIdsQuery = categoryIds.join(",");
        url = `Courses/byCategories?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryIds=${categoryIdsQuery}`;
      }

      const response = await getAPI(url);
      if (response.status === 200) {
        setCourses(response.data);
      }
      return response;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return error;
    }
  };

  const getTotalCourseCount = async (categoryIds = []) => {
    try {
      let url;
      if (categoryIds.length === 0) {
        url = "Courses/totalCount";
      } else if (categoryIds.length === 1) {
        url = `Courses/totalCountByCategory/${categoryIds[0]}`;
      } else {
        const categoryIdsQuery = categoryIds
          .map((id) => `categoryIds=${id}`)
          .join("&");
        url = `Courses/totalCountByCategories?${categoryIdsQuery}`;
      }

      const response = await getAPI(url);
      if (response.status === 200) {
        setTotalCourseCount(parseInt(response.data.data));
      }
      return response;
    } catch (error) {
      console.error("Error getting total course count:", error);
      return error;
    }
  };

  const getCourseById = async (id) => {
    try {
      const response = await getAPI(`Courses/${id}`);
      if (response.status === 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await deleteAPI(`Courses/${id}`);
      if (response.status === 204) {
        setCourses((prevCourses) => ({
          ...prevCourses,
          data: prevCourses.data.filter((course) => course.id !== id),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting course:", error);
      return false;
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      const response = await putAPI(`Courses/${id}`, courseData);
      if (response.status === 204) {
        setCourses((prevCourses) => ({
          ...prevCourses,
          data: prevCourses.data.map((course) =>
            course.id === id ? { ...course, ...courseData } : course
          ),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating course:", error);
      return false;
    }
  };

  const createCourse = async (courseData) => {
    try {
      const response = await postAPI("Courses", courseData);
      if (response.status === 201) {
        setCourses((prevCourses) => ({
          ...prevCourses,
          data: [...prevCourses.data, response.data.data],
        }));
        return { success: true, data: response.data.data };
      }
      return { success: false, error: "Kurs eklenemedi" };
    } catch (error) {
      console.error("Error creating course:", error);
      return { success: false, error: error.message };
    }
  };

  const values = {
    courses,
    course,
    getCoursesByPagination,
    totalCourseCount,
    getTotalCourseCount,
    getCourseById,
    deleteCourse,
    updateCourse,
    createCourse,
  };

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
}
