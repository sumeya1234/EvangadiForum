import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import classes from "./Home.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import TagSearch from "../../components/TaggedQuestions/TaggedQuestions";
import { MdOutlineArrowDropDown } from "react-icons/md";
function Home() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortMethod, setSortMethod] = useState("id");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosBase.get(`/question`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions", error);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const sortQuestions = (questions, method) => {
    if (method === "id") {
      return [...questions].sort((a, b) => b.id - a.id);
    } else if (method === "title") {
      return [...questions].sort((a, b) => a.title.localeCompare(b.title));
    }
    return questions;
  };

  const handleSortChange = (e) => {
    setSortMethod(e.target.value);
  };

  const sortedQuestions = sortQuestions(questions, sortMethod);

  return (
    <div className={classes.centeredContainer}>
      <div className={classes.header}>
        <Link to={user ? "/ask-question" : "/login"}>
          <button className={classes.askQuestionBtn}>Ask Question</button>
        </Link>
        {user && (
          <h5>
            Welcome : <span style={{ color: "#fb8402" }}>{user.username}</span>
          </h5>
        )}
      </div>
      <form className="form-inline my-2 my-lg-0">
        <TagSearch />
      </form>
      <div className={classes.sortContainer}>
        <label htmlFor="sort-select">Sort results by: </label>
        <div className={classes.sortWrapper}>
          <select
            id="sort-select"
            value={sortMethod}
            onChange={handleSortChange}
            className={classes.sortSelect}
          >
            <option value="id">Most Recent</option>
            <option value="title">Title (A-Z)</option>
          </select>
          < MdOutlineArrowDropDown className={classes.dropDownIcon} />
        </div>
      </div>
      <div className={classes.userQuestions}>
        {loading && <p>Loading questions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {sortedQuestions.map((question) => (
          <div key={question.questionid} className={classes.questionItem}>
            <div className={classes.userInfo}>
              <FaUserCircle size={60} />
              <p>{question.username}</p>
            </div>
            <Link
              to={`/question/${question.questionid}`}
              className={classes.questionContent}
            >
              <p style={{ textAlign: "left", width: "100%" }}>
                {question.title}
              </p>
              <MdArrowForwardIos size={40} color="#000" />  
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
