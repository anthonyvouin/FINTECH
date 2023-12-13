import React, { useState, useEffect } from "react";

export default function Admin() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/questions-reponses");
        const data = await response.json();
        setQuestions(data.questionsReponses);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions et réponses :", error);
        // Gérer l'erreur ici, par exemple afficher un message d'erreur à l'utilisateur.
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">azeryuihgfddfghj</h1>
      <div>
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
