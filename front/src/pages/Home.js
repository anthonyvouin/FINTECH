import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { questions } from "../datas/questions";
import hero_image from "../media/office-workers-using-finance-graphs_23-2150408681.jpg";

export default function Home() {
  const ref = useRef(null);
  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState(responses[currentQuestionIndex]);
  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const newProgress = ((currentQuestionIndex - 1) / questions.length) * 100;
      setProgress(newProgress);
      setInputValue(responses[currentQuestionIndex - 1]);
      setShowError(false);
    }
  };
  const handleNextQuestion = () => {
    if (inputValue.trim() !== '' && currentQuestionIndex < questions.length - 1) {
      setShowError(false);
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = inputValue;
      setResponses(updatedResponses);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const newProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
      setProgress(newProgress);
      setInputValue(responses[currentQuestionIndex + 1]);
    } else {
      setShowError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = inputValue;
    setResponses(updatedResponses);
    
    const questionsResponses = updatedResponses.map((response, index) => {
      const question = questions[index];
      return { question: question.question, response };
    });


    const reponse_tab = { reponses: questionsResponses };
    sendQuestionForm(reponse_tab);
    
    document.querySelectorAll(".questions_input").forEach((element) => {
      element.value = "";
    });
  };

  function sendQuestionForm(questionsResponses) {
    return fetch(`http://localhost:3000/api/reponse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionsResponses),
    }).then((data) => data.json());
  }

  return (
    <>
      <section
        className="py-24 flex items-center min-h-screen justify-center bg-cover relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero_image})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="mx-auto max-w-[43rem] text-center relative z-10">
          <p className="text-lg font-medium leading-8 text-slate-50">
            Semaine FINTECH - Projet n°3
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-10 text-white">
            Tableau de bord du trader
          </h1>
          <p className="mt-3 text-lg text-slate-200">
            Afin de recueillir les besoins utilisateurs et mieux les comprendre,
            nous avons d’abord sélectionné les critères qui reviennent à chaque
            analyse de tableau de bord actuels. Par conséquent, nous avons posé
            une question qui couvre au moins un de ces critères. Le but de ce
            questionnaire est d’avoir un feedback qui englobe les critères
            essentiels dans un dashboard trading.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-50 transition-colors hover:bg-slate-900"
              onClick={handleClick}
            >
              Répondre aux questions
            </button>
            <Link
              to="/contact"
              className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-50 transition-colors hover:bg-slate-900"
            >
              Donner nous un feedback
            </Link>
          </div>
        </div>
      </section>

      <section ref={ref} className="bg-white p-16">
        <h1 className="my-3 text-2xl font-bold text-black text-center">
          Tableau de bord du trader
        </h1>

        <form onSubmit={handleSubmit}>
        <div key={questions[currentQuestionIndex].id} className="mb-5">
          <label
            htmlFor={`question-${questions[currentQuestionIndex].id}`}
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            {questions[currentQuestionIndex].question}
          </label>
          <input
            type="text"
            id={`question-${questions[currentQuestionIndex].id}`}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowError(false); // Cacher le message d'erreur dès que l'utilisateur commence à saisir quelque chose
            }}
            required
            className="questions_input block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
          />
          {inputValue.trim() === '' && (
            <p className="text-red-500 text-sm mt-1">Veuillez remplir ce champ.</p>
          )}
        </div>
        <div className="flex justify-between items-center mt-6">
          {currentQuestionIndex !== 0 && (
            <button
              type="button"
              className="text-sm bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handlePreviousQuestion}
            >
              Précédent
            </button>
          )}
          <div className="text-gray-600">{`${currentQuestionIndex + 1} / ${questions.length}`}</div>
          {questions.length !== currentQuestionIndex + 1 ? (
            <button
              type="button"
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextQuestion}
              disabled={inputValue.trim() === ''}
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Envoyer
            </button>
          )}
        </div>

        <div className="mt-4">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        </form>
      </section>
    </>
  );
}
