import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Header from "./components/Header/Header";
import Question from "./pages/Question/Question";
import QuestionForm from "./pages/Question/QuestionForm";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import axios from "./axiosConfig";
import AuthContainer from "./pages/authContainer/authContainer";

// creating a context for managing user state across the app
export const AppState = React.createContext();

function App() {
  // state for managing the authenticated user
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token"); // retrieve token from local storage
  const navigate = useNavigate(); // hook for navigation

  async function checkUser() {
    try {
      const { data } = await axios.get("users/check", {
        headers: {
          Authorization: "Bearer " + token, // sending token for authentication
        },
      });
      setUser(data);
    } catch (error) {
      console.error("Error checking user: ", error); // Log any errors
    }
  }

  //  Effect to check user status on component mount
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      {" "}
      {/* Providing user state to the context */}
      <Header />
      <Routes>
        {/* Define routes for the application */}
        <Route path="/" element={<Home />} />

        {/* User needs to be authenticated to ask a question */}
        <Route
          path="/ask-question"
          element={user ? <QuestionForm /> : <Navigate to="/login" />}
        />

        {/* Show question details, allow answering if user is logged in */}
        <Route path="/question/:question_id" element={<Question />} />
        <Route
          path="/answer/:question_id"
          element={user ? <Question /> : <Navigate to="/login" />}
        />

        {/* Authentication routes */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}

        {/* Authentication route that uses the AuthContainer */}
        <Route path="/login" element={<AuthContainer initialForm="login" />} />
        <Route
          path="/signup"
          element={<AuthContainer initialForm="signup" />}
        />

        {/* Information page about how the application works */}
        <Route path="/how-it-works" element={<Features />} />

        {/* Catch all route to redirect to home for undefined paths  */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
