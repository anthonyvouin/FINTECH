import React, { useState, useEffect } from "react";

import { questionReponse } from '../datas/questionReponse';

export default function Admin() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/questions-reponses"
        );
        const data = await response.json();
        setQuestions(data.questionsReponses);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des questions et réponses :",
          error
        );
      }
    };

    fetchQuestions();
  }, []);

  const downloadCSV = () => {
    // ... (votre fonction downloadCSV actuelle)
  };

  const downloadPDF = () => {
    fetch("http://localhost:3000/api/questions-reponses/pdf")
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "questions-reponses.pdf";
        link.click();
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement du PDF :", error);
      });
  };

  console.log(questionReponse);
  return (
    <div className="w-full flex-grow p-6">
      <h1 className="text-3xl text-center font-bold pb-6">Reponses des utilisateurs</h1>
      <div>
        {/* Bouton pour télécharger les données au format CSV */}
        <div className="mb-4">
        {/* Bouton pour télécharger les données au format CSV */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          onClick={downloadCSV}
        >
          Télécharger CSV
        </button>

        {/* Bouton pour télécharger les données au format PDF */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={downloadPDF}
        >
          Télécharger PDF
        </button>
      </div>
        {/* Afficher le contenu des questions ici */}
        <div className="bg-white overflow-auto">
          <table className="text-left w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Question</th>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Reponse</th>
              </tr>
            </thead>
            <tbody>
            {
              questionReponse.map((questions, index) => {
                return (
                  <tr key={index} className="hover:bg-grey-lighter">
                    <td className="py-4 px-6 border-b border-grey-light">{questions.question}</td>
                    <td className="py-4 px-6 border-b border-grey-light">{questions.reponse}</td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>

      {/* Afficher le contenu des questions ici */}
      {questions.map((question, index) => (
        <div key={index} className="my-4 p-4 border border-gray-300 rounded">
          <ul>
            {question.reponses.map((reponse, subIndex) => (
              <li key={subIndex} className="mb-2">
                <p className="font-semibold">Question: {reponse.question}</p>
                <p>Réponse: {reponse.reponse}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
}
