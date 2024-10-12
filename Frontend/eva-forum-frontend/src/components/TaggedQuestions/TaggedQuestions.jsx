import React, { useState } from "react";
import axiosBase from "../../axiosConfig";
import classes from "./taggedQuestions.module.css";

const TagSearch = () => {
  const [tags, setTags] = useState("");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setQuestions([]);
    setIsLoading(true);

    try {
      //problem child here
      const response = await axiosBase.get("/questions/by-tags", {
        params: { tags },
      });
      setQuestions(response.data);
      console.log(response.data);
    } catch (err) {
      setError("An error occurred while fetching questions by keywords (tags). Please try again.");
      console.error("Error fetching questions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.TagSearchContainer}>
      <h1 className="text-2xl font-bold mb-4">Search Questions by Tags</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className={classes.searchBar_wrapper}>
          <input
            value={tags}
            type="text"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter keywords or tags (comma-separated) of a question"
            aria-label="Search"
          />
          <button
            onClick={handleSubmit}
            // type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {questions?.length > 0 ? (
        <div className={classes.TagSearchResults}>
          <h3>Tag Search Results:</h3>

          <ul className="space-y-4">
            {questions.map((question) => (
              <li key={question.id}>
                <h5 className="">{question.title}</h5>
                <p className={classes.QuestDesc}>{question.description}</p>
                <small>Tags:{question.tag}</small>

                <p className="text-sm text-gray-500 mt-1">
                  Answers: {question.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // !isLoading && <p>No questions found. Try different tags.</p>
        questions.length === 0 &&
        !isLoading && <p></p>
      )}
    </div>
  );
};

export default TagSearch;
