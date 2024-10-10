import React from 'react';
import styles from './Features.module.css'; // Import the CSS module

function Features() {
  return (
    <div className={styles.featuresContainer}>
      <h1 className={styles.title}>Guide To Use Our Q & A Platform</h1>
      <ol className={styles.stepList}>
        <li className={styles.stepItem}>Create an account to start asking and answering questions.</li>
        <li className={styles.stepItem}>Navigate to the "Ask a Question" page to submit your queries.</li>
        <li className={styles.stepItem}>Browse existing questions and provide answers if you can.</li>
        <li className={styles.stepItem}>Engage with the community and provide feedback on answers.</li>
        <li className={styles.stepItem}>Check back regularly for new questions and updates!</li>
      </ol>
      <br />
       <br />
       <br />

    </div>
  );
}

export default Features;
