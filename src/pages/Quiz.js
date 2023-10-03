import React, { useState, useEffect, useCallback } from "react";
import Options from "../component/Options";
import { Card } from "react-bootstrap";

const Quiz = ({ questions, finished }) => {
  const [timer, setTimer] = useState(15);
  const [qNumber, setQNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [evaluate, setEvaluate] = useState(false);

  useEffect(() => {
    setTimer(15);
    setQNumber(1);
    setScore(0);
    setSelectedAnswer("");
    setEvaluate(false);
  }, [questions]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer <= 1) {
        setEvaluate("spin");
      }
      if (timer === 0) {
        setEvaluate("no time");
        setSelectedAnswer(false);
      } else {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  const change = useCallback((a) => {
    setSelectedAnswer(a);
  }, []);

  const evaluateQuestion = useCallback(() => {
    setEvaluate("spin");
    setTimer(false);

    setTimeout(() => {
      if (selectedAnswer === questions[qNumber - 1].correctAns) {
        setEvaluate("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        setEvaluate("wrong");
      }
    }, 0);
  }, [questions, qNumber, selectedAnswer]);

  const nextQuestion = useCallback(() => {
    if (qNumber === 10) {
      finished(score >= 6 ? "pass" : "fail");
    }

    setTimeout(() => {
      setEvaluate("spin");
      setTimer(false);
    }, 150);

    setTimeout(() => {
      setTimer(15);
      setQNumber((prevQNumber) => prevQNumber + 1);
      setEvaluate(false);
      setSelectedAnswer("");
    }, 300);
  }, [qNumber, score, finished]);

  useEffect(() => {
    if (evaluate === "correct") {
      nextQuestion();
    }
    if (evaluate === "wrong") {
      nextQuestion();
    }
    if (evaluate === "no time") {
      nextQuestion();
    }
  }, [evaluate, nextQuestion]);

  let question;
  let options;
  let answer;
  let opt;

  if (questions.length > 1) {
    question = questions[qNumber - 1].question;
    answer = questions[qNumber - 1].correctAns;
    options = questions[qNumber - 1].options;
    opt = options.map((ans, i) => {
      return (
        <Options
          key={i}
          option={ans}
          answer={answer}
          change={(a) => change(a)}
        />
      );
    });
  }

  return (
    <>
      <Card className="play">
        <Card.Header>
          <p>Time left: {timer === false ? 0 : timer}</p>
          <p>Correct: {score}</p>
        </Card.Header>

        <div
          className="question"
          onClick={() => {
            if (evaluate === false) {
              evaluateQuestion();
            } else {
              nextQuestion();
            }
          }}
        >
          <h1>Question {qNumber} / 10</h1>
          <h1>{decodeURIComponent(question)}</h1>
        </div>

        <div
          className="options"
          onClick={() => {
            if (evaluate === false) {
              evaluateQuestion();
            } else {
              nextQuestion();
            }
          }}
        >
          {opt}
        </div>
      </Card>
    </>
  );
};

export default Quiz;
