import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  const downloadCSV = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/questions-reponses/csv"
      );
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "questions-reponses.csv";
      link.click();
    } catch (error) {
      console.error("Erreur lors du téléchargement du CSV :", error);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/questions-reponses/pdf"
      );
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "questions-reponses.pdf";
      link.click();
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF :", error);
    }
  };

  const downloadJSON = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/questions-reponses/json"
      );
      const data = await response.json();
      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(jsonBlob);
      link.download = "questions-reponses.json";
      link.click();
    } catch (error) {
      console.error("Erreur lors du téléchargement du JSON :", error);
    }
  };

  const downloadXML = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/questions-reponses/xml"
      );
      const data = await response.text();
      const xmlBlob = new Blob([data], { type: "application/xml" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(xmlBlob);
      link.download = "questions-reponses.xml";
      link.click();
    } catch (error) {
      console.error("Erreur lors du téléchargement du XML :", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">DashBoard Admin</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          onClick={downloadCSV}
        >
          Télécharger CSV
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-4"
          onClick={downloadPDF}
        >
          Télécharger PDF
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-4"
          onClick={downloadJSON}
        >
          Télécharger JSON
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={downloadXML}
        >
          Télécharger XML
        </button>
        <Link to="/ContactInfo" className="ml-4 text-blue-500 hover:underline">
          Voir les informations de contact
        </Link>
      </div>

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
  );
}
