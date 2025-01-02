import { createContext, useState } from "react";
import { getAPI } from "../services/apiService";
import axios from "axios";

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

  const values = {
    courses,
    course,
    getCoursesByPagination,
    totalCourseCount,
    getTotalCourseCount,
    getCourseById,
  };

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
}
