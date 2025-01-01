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

function AppContent() {
  const { snackbar, setSnackbar } = useContext(CourseContext);

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin-page" element={<SignIn />}></Route>
        <Route path="/signup-page" element={<SignUp />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
      </Routes>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CourseProvider>
          <AppContent />
        </CourseProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
