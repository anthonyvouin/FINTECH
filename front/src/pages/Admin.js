import { useState, useEffect } from 'react';

export default function Admin() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
  
    fetch(`http://localhost:3000/admin/api/questions-reponses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${username}:${password}`,
      },
      body: JSON.stringify({
        username: username,
        password: password
      }
    )})
    .then(data => {
      if (!data.ok) {
        throw new Error('Failed to fetch data');
      }
      return data.json(); // Convertit les données de la réponse en JSON
    })
    .then(parsedData => {
      console.log(parsedData); // Affiche les données obtenues
      setQuestions(parsedData); // Met à jour l'état avec les données récupérées
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);


  return (
    <h1 className="text-3xl text-center font-bold">
      NoPAdminage
    </h1>
  )
}
