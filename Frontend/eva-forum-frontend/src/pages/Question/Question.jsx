import { useParams, useNavigate } from 'react-router-dom'; 
import { useEffect, useState, useRef, useContext } from 'react';
import axios from '../../axiosConfig';
import { FaCircleArrowRight } from "react-icons/fa6";
import styles from './Question.module.css';
import { AppState } from '../../App'; // Import user state
import { FaUserCircle } from 'react-icons/fa';

function Question() {
  const { user } = useContext(AppState); // Get the user state
  const { question_id } = useParams();
  const navigate = useNavigate(); // To handle redirection
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const answerDom = useRef(null);

  

  useEffect(() => {
    
    const fetchQuestionAndAnswers = async () => {
      try {
        const questionResponse = await axios.get(`/question/${question_id}`);
        setQuestion(questionResponse.data.singleQuestion[0]);

        const answerResponse = await axios.get(`/answer/${question_id}`);
        setAnswers(answerResponse.data.answers);
        console.log(answers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };

    fetchQuestionAndAnswers();
  }, [question_id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const answerValue = answerDom.current.value;

    if (!answerValue) return;

    if (!user) {
      alert("Please log in to submit an answer.");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("No token found. Please log in again.");
        navigate("/login");
        return;
    }
      console.log(token)

      await axios.post('/answer', {
        questionid: question_id,
        answer: answerValue
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

      answerDom.current.value = '';
      const updatedAnswers = await axios.get(`/answer/${question_id}`);
      setAnswers(updatedAnswers.data.answers);
      console.log(updatedAnswers);
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  return (
    <div className={styles.questionPageContainer}>
      <h1 className={styles.questionTitle}>QUESTION</h1>
       
      <div className={styles.questionDetail}>
        {question ? (
          <>
            <p><FaCircleArrowRight size={20} /> {question.title}</p>
            <p>{question.description}</p>
            <p> tag - #{question.tag}</p>
          </>
        ) : (
          <p>Loading question...</p>
        )}
      </div>

      <div className={styles.answersSection}>
        <h3>Answers From The Community</h3>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.answerid} className={styles.answer}>
              <div>
              <FaUserCircle size={60} />
              <p><strong>{answer.username}</strong></p>
              </div>
              <p>{answer.answer}</p>
            </div>
          ))
        ) : (
          <p>No answers yet.</p>
        )}
      </div>

      <div className={styles.answerForm}>
        <h3>Your Answer</h3>
        <form onSubmit={handleAnswerSubmit}>
          <textarea
            className={styles.answerTextarea}
            ref={answerDom}
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
