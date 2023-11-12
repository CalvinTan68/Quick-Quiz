import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, Navigate } from "react-router-dom";

import Init from "./pages/Home";
import Play from "./pages/Quiz";
import Result from "./component/Result";

import { API_TOKEN, API_URL } from "./constants";

const App = () => {
  const [page, setPage] = useState("init");
  const [spinner, setSpinner] = useState(false);
  const [questions, setQuestions] = useState({});
  const [level, setLevel] = useState(1);
  const [passed, setPassed] = useState(false);
  const [token, setToken] = useState("");

  const shuffle = (a) => {
    return a.sort(() => Math.random() - 0.5);
  };

  const start = () => {
    setSpinner(!spinner);
    setTimeout(() => {
      getUrl();
    }, 300);
  };

  const getToken = async () => {
    await axios.get(API_TOKEN).then((res) => {
      setToken(res.data.token);
    });
  };

  const getUrl = async () => {
    if (token !== "") {
      getToken();
    }

    let res = await axios.get(API_URL);

    if (res.data.results) {
      let newQuestions = res.data.results.map((q) => {
        let opt = q.incorrect_answers;
        opt.push(q.correct_answer);
        return {
          question: q.question,
          correctAns: q.correct_answer,
          options: shuffle(opt),
        };
      });
      setQuestions(newQuestions);
      setPage("play");
      setSpinner(false);
    }
  };

  const finished = (a) => {
    if (a === "pass") {
      setPassed(true);
    }
    setPage("result");
  };

  const play = () => {
    getUrl();
  };

  let content =
    page === "init" ? (
      <Init click={() => start()} spinner={spinner} />
    ) : page === "play" ? (
      <Play questions={questions} level={level} finished={(a) => finished(a)} />
    ) : page === "result" ? (
      <Result pass={passed} play={() => play()} />
    ) : null;

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<div className="containerFluid">{content}</div>}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
