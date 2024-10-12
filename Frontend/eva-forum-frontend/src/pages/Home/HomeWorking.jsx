import { useContext, useEffect, useState } from "react";
import { AppState } from "../../App"; // Importing AppState context to access user data
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./Home.module.css";
import { CgProfile } from "react-icons/cg";
import { MdArrowForwardIos } from "react-icons/md";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { FaUserCircle } from "react-icons/fa";
import TagSearch from "../../components/TaggedQuestions/TaggedQuestions";


function Home() {
  //Accessing user state from context
  const { user } = useContext(AppState);

  // state variable for questions,loading status, and error handling
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch questions from the server when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset error state

      try {
        // Fetching questions from the API
        const response = await axios.get(`/question`);
        setQuestions(response.data.questions); // Storing fetched questions in state
        console.log(questions)
      } catch (error) {
        console.error("Error fetching questions", error);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false); // Setting loading to false after fetching
      }
    };

    fetchQuestions(); // call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  return (

    //Check Tagged questions

    // End tagged questions

    <div className={classes.centeredContainer}>
      <div className={classes.header}>
      <Link to={user ? "/ask-question" : "/login"}>
          <button className={classes.askQuestionBtn}>Ask Question</button>
        </Link>
        {user && <h5 >Welcome : <span style={{color:"#fb8402"}}>{user.username}</span> </h5>}
        
      </div>
      <form class="form-inline my-2 my-lg-0" >
      {/* <input style={{width:"700px"}} class="form-control mr-sm-2" type="search" placeholder="Search question" aria-label="Search"/> */}
    
    <TagSearch/>
    </form>
      <div className={classes.userQuestions}>
      
        {loading && <p>Loading questions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {questions?.map((question) => (
          <div key={question.questionid} className={classes.questionItem}>
            <div>
            <FaUserCircle size={60} />
         
            <p>{question.username}</p>
        
            </div>
           
            <Link
              to={`/question/${question.questionid}`}
              className={classes.questionContent}
            >
              <p>{question.title}</p>
              <MdArrowForwardIos size={40} color="#000" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
