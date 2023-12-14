import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";

import { questions } from '../datas/questions';

import hero_image from "../media/office-workers-using-finance-graphs_23-2150408681.jpg"

export default function Home() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [responses, setResponses] = useState([]);

  const handleChange = (e, questionId) => {
    const { value } = e.target;

    // Vérifie si la question est déjà dans la liste des réponses
    const existingResponseIndex = responses.findIndex((response) => response.id === questionId);

    if (existingResponseIndex !== -1) {
      // Mise à jour de la réponse si la question existe déjà
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex].response = value;
      setResponses(updatedResponses);
    } else {
      // Ajout d'une nouvelle réponse
      setResponses([...responses, { id: questionId, response: value }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Formatage des réponses dans le format souhaité
    const questionsResponses = responses.map((response) => {
      const question = questions.find((q) => q.id === response.id);
      return { question: question.question, reponse: response.response };
    });

    document.querySelectorAll(".questions_input").forEach(element => {
      element.value = "";
    });

    // Envoi des données au backend
    sendQuestionForm(questionsResponses);
  };

  function sendQuestionForm(questionsResponses) {
    return fetch(`http://localhost:3000/api/reponse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionsResponses),
    }).then((data) => data.json());
  }
  return (
    <>
      
    <section className="py-24 flex items-center min-h-screen justify-center bg-white  w-full bg-center bg-cover "
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero_image})`
    }}>
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-slate-50">Semaine FINTECH - Projet n°3</p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] text-white">Tableau de bord du trader</h1>
          <p className="mt-3 text-lg text-slate-200">Afin de recueuillir les besoins utilisateurs et mieux les comprendre, nous avons d’abord séléctionné  les critères qui reviennent à chaque analyse de tableau de bord actuels. Par conséquent, nous avons posé une question qui couvre au moins un de ces critères.  Le but de ce questionnaire et d’avoir un feedback qui englobe  les critères essentiels dans un dashbord trading. </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-50 transition-colors hover:bg-slate-900"
                  onClick={handleClick}>
            Repondre aux questions
          </button>
          <Link to="/contact" className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-50 transition-colors hover:bg-slate-900">
            Donner nous un feeadback
          </Link>
        </div>
      </div>
    </section>

    <section ref={ref} className="bg-white p-16">
      <h1 className="my-3 text-[2rem] font-bold text-black text-center">Tableau de bord du trader</h1>

      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="mb-5">
            <label htmlFor={`question-${question.id}`} className="block mb-2 text-sm font-medium text-gray-900">
              {question.question}
            </label>
            <input
              type="text"
              id={`question-${question.id}`}
              onChange={(e) => handleChange(e, question.id)} required
              className="questions_input block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
        <button type="submit" className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Envoyer
        </button>
      </form>
    </section>
    </>
  )
}