import { useParams } from 'react-router-dom'; 
import { useEffect, useState,useRef } from 'react';
import axios from '../../axiosConfig';
import { FaCircleArrowRight } from "react-icons/fa6";
import styles from './Question.module.css';
import {StatusCodes} from 'http-status-codes'

function Question() {
  const { question_id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // const [newAnswer, setNewAnswer] = useState('');
  const answerDom = useRef(null);
  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const questionResponse = await axios.get(`/question/${question_id}`);
        setQuestion(questionResponse.data.singleQuestion[0]);

        const answerResponse = await axios.get(`/answer/${question_id}`);
        setAnswers(answerResponse.data.answers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuestionAndAnswers();
  }, [question_id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const answerValue = answerDom.current.value;


    if (!answerValue) {
      setError("Please fill out the response.");
      return;
    }

    try {
       
     const response =  await axios.post('/answer', { questionid: question_id, answer: answerValue }); // using params identify the current questionid (db) or question_id(url) and insert into answer table
     if (response.status === StatusCodes.CREATED) {
      console.log('Response from backend:', response.data.msg);

      answerDom.current.value= ' ';
    } else {
      console.error('Unexpected response:', response);
      }
      // setNewAnswer('');
      const updatedAnswers = await axios.get(`/answer/${question_id}`);
      setAnswers(updatedAnswers.data.answers);

     setSubmitted(true); // setSubmitted status to true , to clear response box
      console.log(submitted)
  
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
              <p><strong>{answer.username}</strong></p>
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
          {/* Submitted = true  && */}
          <textarea
            className={styles.answerTextarea}
            // {
            //   ...submitted=true?
            //    : value=""
            // }
            
            ref={answerDom}
            // value={newAnswer}
            // onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Your answer..."
          />
          <button type="submit" className={styles.submitButton}>Post Answer</button>
        </form>
      </div>
    </div>
  );
}

export default Question;
