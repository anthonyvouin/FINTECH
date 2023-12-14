import React, { useState, useRef } from "react";
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
    
    const questionsResponses = updatedResponses.map((reponse, index) => {
      const question = questions[index];
      return { question: question.question, reponse };
    });

    console.log("----------------------");
    const reponse_tab = { reponses: questionsResponses };
    console.log(reponse_tab);
    sendQuestionForm(reponse_tab);
    
    document.querySelectorAll(".questions_input").forEach((element) => {
      element.value = "";
    });


    localStorage.setItem("form_complete", JSON.stringify(true));
  };

  function sendQuestionForm(questionsResponses) {
    return fetch(`http://localhost:3000/api/reponse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionsResponses),
    }).then((data) => data.json());
  }

  function formComplete() {
    return `
      <div class="flex flex-col items-center justify-center" >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM11.768 15.64L16.768 9.64L15.232 8.36L10.932 13.519L8.707 11.293L7.293 12.707L10.293 15.707L11.067 16.481L11.768 15.64Z" fill="black"/>
        </svg>
        <p class="my-3 text-2xl font-bold text-black text-center">Merci pour vos retours ♥</p>
      </div>
    `
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
          Pour rendre le trading plus ergonomique pour les professionnels, nous avons repensé l'interface visuel d'un tableau de bord en nous appuyant sur les retours des utilisateurs recueillis via notre formulaire de contact. L'objectif est d’adapter les tableaux de bord de façon à les rendre plus modulabes et personnalisables
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

      <section ref={ref} className="bg-white p-16" id="question_container">

      {localStorage.getItem('form_complete') !== "true" ? 
      (
        <>
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
            value={inputValue}
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM11.768 15.64L16.768 9.64L15.232 8.36L10.932 13.519L8.707 11.293L7.293 12.707L10.293 15.707L11.067 16.481L11.768 15.64Z" fill="black"/>
          </svg>
          <p className="my-3 text-2xl font-bold text-black text-center">Merci pour vos retours ♥</p>
        </div>
      )
      }

      </section>
    </>
  );
}
