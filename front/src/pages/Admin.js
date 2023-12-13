import { useState, useEffect } from 'react';

export default function Admin() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
  
    fetch(`http://localhost:3000/admin/api/questions-reponses`, {
      method: 'GET',
    }).then(data => {
      setQuestions(data.json().questions)
    })
  }, []);


  return (
    <h1 className="text-3xl text-center font-bold">
      azeryuihgfddfghj
    </h1>
  )
}
