import { UserProvider } from "./context/UserContext";
import { CourseProvider, CourseContext } from "./context/CourseContext";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Snackbar, Alert } from "@mui/material";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import CourseList from "./pages/CourseList";
import { CategoryProvider } from "./context/CategoryContext";
import CourseDetail from "./pages/CourseDetail";
import { AuthProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";
import Basket from "./pages/Basket";
import Payment from "./pages/Payment";
import { PaymentProvider } from "./context/PaymentContext";
import { OrderProvider } from "./context/OrderContext";
import Profile from "./pages/Profile";
import Educator from "./pages/Educator";
import CourseForm from "./components/CourseForm";
import UserCourses from "./pages/UserCourses";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { TranslationProvider } from "./context/TranslationContext";

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin-page" element={<SignIn />}></Route>
        <Route path="/signup-page" element={<SignUp />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/educator" element={<Educator />} />
        <Route path="/courses/new" element={<CourseForm />} />
        <Route path="/courses/edit/:id" element={<CourseForm />} />
        <Route path="/user-courses" element={<UserCourses />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <TranslationProvider>
        <PaymentProvider>
          <OrderProvider>
            <BrowserRouter>
              <BasketProvider>
                <AuthProvider>
                  <UserProvider>
                    <CourseProvider>
                      <CategoryProvider>
                        <AppContent />
                      </CategoryProvider>
                    </CourseProvider>
                  </UserProvider>
                </AuthProvider>
              </BasketProvider>
            </BrowserRouter>
          </OrderProvider>
        </PaymentProvider>
      </TranslationProvider>
    </I18nextProvider>
  );
}

export default App;
