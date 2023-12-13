import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">azeryuihgfddfghj</h1>
      <div>
        {/* Bouton pour télécharger les données au format CSV */}
        <button onClick={downloadCSV}>Télécharger CSV</button>

        {/* Afficher le contenu des questions ici */}
        {questions.map((question, index) => (
          <div key={index}>
            <h2>{question._id}</h2>
            <ul>
              {question.reponses.map((reponse, subIndex) => (
                <li key={subIndex}>
                  <p>Question: {reponse.question}</p>
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
