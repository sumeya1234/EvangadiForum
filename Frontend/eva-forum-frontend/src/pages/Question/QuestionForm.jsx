import React, {useRef, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import classes from "./questionForm.module.css";
import { FaCircleArrowRight } from "react-icons/fa6";


function QuestionForm() {

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState(null);
  const titleDom = useRef();
  const descriptionDom = useRef(); 
  const navigate = useNavigate();
  const tagDom = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const tagValue = tagDom.current.value;
    
    if (!titleValue || !descriptionValue) {
      setError("Please fill out both fields.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      await axios.post("/question", {
        title: titleValue,
        description: descriptionValue,
        tag:tagValue
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Show success message
      setSuccessMessage("Your question is posted. Let's go back to home page.");
      
      // Clear the form
      titleDom.current.value = "";
      descriptionDom.current.value = "";
      
      
      setTimeout(() => {
        navigate("/");
      }, 3000);  // Redirect after 3 seconds
    } catch (error) {
      console.error("Error posting question:", error);
      setError("Failed to post question. Please try again.");
    }
  };
  
  const gotohome = () => {
    navigate("/");
  }

  return (
    <div className={classes.questionFormContainer}>
    

      <h2 className={classes.questionFormHeader}>Steps To Write A Good Question.</h2>
      
      {error && <p className={classes.errorMessage}>{error}</p>}
      
      
      
      <p><FaCircleArrowRight size={20} /> Summarize your problems in one-line-title.</p>
      <p><FaCircleArrowRight size={20} /> Describe your problem in more detail.</p>
      <p><FaCircleArrowRight size={20} /> Describe what you tried & what you expected to happen.</p>
      <p><FaCircleArrowRight size={20} /> Review your question and post it here.</p>
      
      <br />
      
      <div className={classes.questioncontainer}>
        <h2>Ask a public question </h2>
        <p onClick={gotohome} style={{ color: "blue" }}>Go to Question page</p>
        <form onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <input
              ref={titleDom}
              type="text"
              id="title"
              placeholder="Enter your question title"
            />
          </div>
          
          <div className={classes.formGroup}>
            <textarea
              ref={descriptionDom}
              id="description"
              placeholder="Describe your problem in detail"
            />
          </div>

          <div className={classes.formGroup}>
          <input
            ref={tagDom}
            type="text"
            id="tag"
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter tags (keywords) separated by a comma and no spaces"
          />
        </div>
          
          <button className={classes.submitButton} type="submit">Post Question</button>
          <br />
          <br />
        </form>


         {/* Success message */}
       {successMessage &&  
        <div className={classes.successcontainer}><p className={classes.successMessage}>{successMessage}</p> 
         </div>
      }
      </div>
    </div>
  );
  
}

export default QuestionForm;