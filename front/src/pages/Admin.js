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
    const csvData = questions
      .map((question) => {
        return `${question._id},${question.reponses
          .map((r) => `${r.question},${r.reponse}`)
          .join(",")}`;
      })
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "questions-reponses.csv";
    link.click();
  };

  console.log(questionReponse);
  return (
    <div className="w-full flex-grow p-6">
      <h1 className="text-3xl text-center font-bold pb-6">Reponses des utilisateurs</h1>
      <div>
        {/* Bouton pour télécharger les données au format CSV */}
        <button className="underline pb-3" onClick={downloadCSV}>Télécharger CSV</button>

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
      </div>
    </div>
  );
}
