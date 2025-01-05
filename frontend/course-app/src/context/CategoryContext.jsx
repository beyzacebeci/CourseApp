import { createContext, useState } from "react";
import { getAPI, postAPI, putAPI, deleteAPI } from "../services/apiService";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoryWithCourses, setCategoryWithCourses] = useState([]);

  const getCategory = async (id) => {
    try {
      const response = await getAPI(`Categories/${id}`);
      if (response.status === 200) {
        setCategory(response.data.data);
      }
      return response;
    } catch (error) {
      console.error("Kategori getirirken hata:", error);
      return error;
    }
  };

  const getAllCategoriesWithCourses = async () => {
    try {
      const response = await getAPI("Categories/courses");
      if (response.status === 200) {
        setCategoryWithCourses(response.data.data);
      }
      return response;
    } catch (error) {
      console.error("Kategoriler ve kursları getirirken hata:", error);
      return error;
    }
  };

  //belirli idye sahip olan kategorinin tüm kurslarını getirir

  const getCategoryWithCourses = async (id) => {
    try {
      const response = await getAPI(`Categories/${id}/courses`);
      if (response.status === 200) {
        setCategoryWithCourses(response.data.data);
      }
      return response;
    } catch (error) {
      console.error("Kategori ve kursları getirirken hata:", error);
      return error;
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const response = await postAPI("Categories", categoryData);
      return {
        success: response.success,
        data: response.data,
        error: response.data?.errorMessage?.[0] || response.data?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await putAPI(`Categories/${id}`, categoryData);
      return {
        success: response.success,
        data: response.data,
        error: response.data?.errorMessage?.[0] || response.data?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await deleteAPI(`Categories/${id}`);
      return {
        success: response.success,
        data: response.data,
        error: response.data?.errorMessage?.[0] || response.data?.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const values = {
    categories,
    category,
    categoryWithCourses,
    getCategory,
    getAllCategoriesWithCourses,
    getCategoryWithCourses,
    createCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
}
