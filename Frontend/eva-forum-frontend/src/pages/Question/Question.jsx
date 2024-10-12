import { useParams, useNavigate } from 'react-router-dom'; 
import { useEffect, useState, useRef, useContext } from 'react';
import axios from '../../axiosConfig'; 
import { FaCircleArrowRight } from "react-icons/fa6"; 
import styles from './Question.module.css'; 
import { AppState } from '../../App'; 

function Question() {
  const { user } = useContext(AppState); // Access user state from context
  const { question_id } = useParams(); // Get question ID from URL parameters
  const navigate = useNavigate(); // Hook to handle redirection
  const [question, setQuestion] = useState(null); // State for the question
  const [answers, setAnswers] = useState([]); // State for storing answers
  const answerDom = useRef(null); // Ref to access the textarea for answers

  // Fetch question and answers on component mount or when question_id changes
  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        // Fetch the question data
        const questionResponse = await axios.get(`/question/${question_id}`);
        setQuestion(questionResponse.data.singleQuestion[0]); // Set question state

        // Fetch answers related to the question
        const answerResponse = await axios.get(`/answer/${question_id}`);
        setAnswers(answerResponse.data.answers); // Set answers state
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
      }
    };

    fetchQuestionAndAnswers(); // Call the fetch function
  }, [question_id]); // Dependency array ensures this runs when question_id changes

  // Handle answer submission
  const handleAnswerSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const answerValue = answerDom.current.value; // Get value from textarea

    if (!answerValue) return; // Exit if the textarea is empty

    // Check if the user is logged in
    if (!user) {
      alert("Please log in to submit an answer."); // Alert if not logged in
      navigate("/login"); // Redirect to login page
      return;
    }

    try {
      // Post the new answer to the server
      await axios.post('/answer', { questionid: question_id, answer: answerValue }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Include authorization token
      });

      answerDom.current.value = ''; // Clear the textarea after submission
      // Fetch updated answers to reflect the new answer
      const updatedAnswers = await axios.get(`/answer/${question_id}`);
      setAnswers(updatedAnswers.data.answers); // Update answers state
    } catch (error) {
      console.error('Error posting answer:', error); // Log any errors
    }
  };

  return (
    <div className={styles.questionPageContainer}>
      <h1 className={styles.questionTitle}>QUESTION</h1>
       
      <div className={styles.questionDetail}>
        {question ? (
          <>
            <p><FaCircleArrowRight size={20} /> {question.title}</p> {/* Display question title */}
            <p>{question.description}</p> {/* Display question description */}
          </>
        ) : (
          <p>Loading question...</p> // Display loading message while fetching data
        )}
      </div>

      <div className={styles.answersSection}>
        <h3>Answers From The Community</h3>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.answerid} className={styles.answer}>
              <p><strong>{answer.username}</strong></p> {/* Display username of the answerer */}
              <p>{answer.answer}</p> {/* Display the answer text */}
            </div>
          ))
        ) : (
          <p>No answers yet.</p> // Message if there are no answers
        )}
      </div>

      <div className={styles.answerForm}>
        <h3>Your Answer</h3>
        <form onSubmit={handleAnswerSubmit}>
          <textarea
            className={styles.answerTextarea}
            ref={answerDom} // Link textarea to ref for access
            placeholder="Your answer..."
          />
          <button type="submit" className={styles.submitButton}>
            Post Answer
          </button> 
        </form>
      </div>
    </div>
  );
}

export default Question; 
