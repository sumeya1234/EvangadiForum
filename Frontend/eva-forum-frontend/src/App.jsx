import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Header from "./components/Header/Header";
import Question from "./pages/Question/Question";
import QuestionForm from "./pages/Question/QuestionForm";
import Features from "./components/Features/Features"
import Footer from "./components/Footer/Footer";

export const AppState = React.createContext(); // Create a context for user state

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/question/:question_id" element={<Question />} />
        <Route path="/ask-question" element={<QuestionForm />} />
        <Route path="/answer/:question_id" element={<Question />} />
        <Route path="/how-it-works" element={<Features />} /> {/* Add this line */}

      </Routes>
      <Footer/>
    </AppState.Provider>
  );
}

export default App;
