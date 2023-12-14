import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { questions } from "../datas/questions";
import hero_image from "../media/office-workers-using-finance-graphs_23-2150408681.jpg";

export default function Home() {
  const ref = useRef(null);
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const questionId = questions[currentQuestionIndex].id;

    const existingResponseIndex = responses.findIndex(
      (response) => response.id === questionId
    );

    if (existingResponseIndex !== -1) {
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex].response = value;
      setResponses(updatedResponses);
    } else {
      setResponses([...responses, { id: questionId, response: value }]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const newProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
      setProgress(newProgress);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const questionsResponses = responses.map((response) => {
      const question = questions.find((q) => q.id === response.id);
      return { question: question.question, reponse: response.response };
    });

    document.querySelectorAll(".questions_input").forEach((element) => {
      element.value = "";
    });

    const reponse_tab = { reponses: questionsResponses };
    sendQuestionForm(reponse_tab);
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
              onChange={(e) => handleChange(e)}
              required
              className="questions_input block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-gray-600">{`${currentQuestionIndex + 1} / ${
              questions.length
            }`}</div>
            <button
              type="button"
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextQuestion}
            >
              Suivant
            </button>
          </div>

          <div className="mt-4">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <button
            type="submit"
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Envoyer
          </button>
        </form>
      </section>
    </>
  );
}
