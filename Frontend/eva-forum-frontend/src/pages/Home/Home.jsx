import { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./Home.module.css";
//import PersonIcon from '@mui/icons-material/Person';
import { CgProfile } from "react-icons/cg";
function Home() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      setError(null); // Reset any previous errors

      //  const questionList =
      try {
        const response = await axios.get(`/question`);
        console.log(response.data)
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions", error);
        setError("Failed to load questions. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className={classes.centeredContainer}>
      <div className={classes.header}>
        {/* {
          // if user logged hi user else hide the h1 tag
          user?  (  <h1>Welcome, {user.username}</h1>) : ""
        } */}
  {user && <h1>Welcome back, {user.username}!</h1>}
        <Link to="/ask-question">
          <button className={classes.askQuestionBtn}>
            Ask Question
          </button>
        </Link>
      </div>
          
      <div className={classes.userQuestions}>
        <h2>Your Questions</h2>
        {loading && <p>Loading questions...</p>} {/* Display loading text */}
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        {questions.length === 0 && !loading && ( // Only show this if not loading
          <p>You haven't asked any questions yet.</p>
        )}
        {questions?.map((question) => (
          <div key={question.id} className={classes.questionItem}>
            <CgProfile size={50}/>
            <div className={classes.questionContent}>
              <Link to={`/question/${question.questionid}`}>
                <h3>{question.title}</h3>
              </Link>
              {/* <p>{question.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
   
  );
}

export default Home;
