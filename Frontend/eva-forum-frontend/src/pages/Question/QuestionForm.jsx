import React, {useRef, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import classes from "./questionForm.module.css";
import { FaCircleArrowRight } from "react-icons/fa6";


function QuestionForm() {

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const titleDom = useRef();
  const descriptionDom = useRef(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    console.log(titleValue)
    if (!titleValue || !descriptionValue) {
      setError("Please fill out both fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("/question", {
        title:titleValue,
        description:descriptionValue
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Your question is posted.');
      navigate("/");
    } catch (error) {
      console.error("Error posting question:", error);
      setError("Failed to post question. Please try again.");
    }
  };

  return (
    <div className={classes.questionFormContainer}>
      <h2 className={classes.questionFormHeader}>Steps To Write A Good Question.</h2>
      {error && <p className={classes.errorMessage}>{error}</p>}
      <p><FaCircleArrowRight size={20} /> Summarize your problems in one-line-title.</p>
      <p><FaCircleArrowRight size={20} /> Describe your problem in more detail.</p>
      <p><FaCircleArrowRight size={20} /> Describe what you tried & what you expected to happen.</p>
      <p><FaCircleArrowRight size={20} /> Review your question and post it here.</p>

      <br />
             <h2>Post your Question </h2>

      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          {/* <label htmlFor="title"></label> */}
          <input
          ref={titleDom}
            type="text"
            id="title"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your question title"
          />
        </div>



        <div className={classes.formGroup}>
          {/* <label htmlFor="description"></label> */}
          <textarea
           ref={descriptionDom}
            id="description"
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your problem in detail"
          />
        </div>



        <button className={classes.submitButton} type="submit">Post Question</button>
        <br />
        <br />
      
      </form>
    
    </div>
  );
}

export default QuestionForm;