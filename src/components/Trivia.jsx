import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import play from '../assets/play.mp3';
import correctAnswer from '../assets/correct.mp3';
import wait from '../assets/wait.mp3';
import wrongAnswer from '../assets/wrong.mp3';
import './Trivia.css';
export default function Trivia({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState('answer');
  const [letsPlay] = useSound(play);
  const [correct] = useSound(correctAnswer);
  const [wrong] = useSound(wrongAnswer);
  //   const [wait] = useSound(wait);
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  //handling click
  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName('answer active');
    delay(3000, () =>
      setClassName(a.correct ? 'answer correct' : 'answer wrong'),
    );
    delay(5000, () => {
      if (a.correct) {
        correct();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          //make selected answer= null otherwise for next question, it will remain green
          setSelectedAnswer(null);
        });
      } else {
        wrong();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    //here below in the square brackets are the dependencies on which this hook depends
  }, [data, questionNumber]);
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>

      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : 'answer'}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
